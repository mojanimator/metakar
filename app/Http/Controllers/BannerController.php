<?php

namespace App\Http\Controllers;

use App\Events\Viewed;
use App\Http\Helpers\Telegram;
use App\Http\Helpers\Util;
use App\Http\Helpers\Variable;
use App\Http\Requests\BannerRequest;
use App\Models\ArticleTransaction;
use App\Models\BannerTransaction;
use App\Models\County;
use App\Models\Banner;
use App\Models\Notification;
use App\Models\Project;
use App\Models\ProjectItem;
use App\Models\Province;
use App\Models\Transfer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function edit(Request $request, $id)
    {

        $data = Banner::with('category')->with('projectItem')->with('owner:id,fullname,phone')->find($id);
        if ($data && optional($data->projectItem)->operator_id)
            $data->projectItem->operator = User::select('id', 'fullname', 'phone')->find($data->projectItem->operator_id);
        $this->authorize('edit', [User::class, $data]);
        $data->message = optional(Notification::firstWhere([
                'data_id' => $data->id, 'type' => 'banner_reject',]
        ))->description;
        if ($data->message)
            $data->message = json_decode($data->message);
        $data->file_link = Banner:: getFileLink($data->id);
        return Inertia::render('Panel/Banner/Edit', [
            'categories' => Banner::categories(),
            'statuses' => Variable::STATUSES,
            'project_statuses' => Variable::PROJECT_STATUSES,
            'data' => $data,
            'max_images_limit' => 1,
        ]);
    }

    public function update(BannerRequest $request)
    {
        $user = auth()->user();
//        $response = ['message' => __('done_successfully')];
        $response = ['message' => __('response_error')];
        $errorStatus = Variable::ERROR_STATUS;
        $successStatus = Variable::SUCCESS_STATUS;
        $charge = $request->charge;
        $id = $request->id;
        $cmnd = $request->cmnd;
        $data = Banner::with('projectItem:id,item_id,item_type,project_id,status,operator_id')->find($id);
        if (!starts_with($cmnd, 'bulk'))
            $this->authorize('update', [User::class, $data]);
        if ($cmnd) {
            switch ($cmnd) {
                case 'inactive':
                    $data->status = 'inactive';
                    $data->save();
                    return response()->json(['message' => __('updated_successfully'), 'status' => $data->status,], $successStatus);

                case 'activate':
                    if ($data->status == 'review')
                        return response()->json(['message' => __('active_after_review'),], $errorStatus);
                    $data->status = 'active';
                    $data->save();
                    return response()->json(['message' => __('updated_successfully'), 'status' => $data->status,], $successStatus);

                case 'view-fee':
                    $fee = $request->view_fee;
                    $min = Variable::MIN_VIEW_FEE('banner');
                    if (!is_int($fee) || $fee < $min)
                        return response()->json(['message' => sprintf(__('validator.min'), __('view_fee'), $min), 'view_fee' => $data->view_fee,], $errorStatus);
                    if ($fee % 50 != 0)
                        return response()->json(['message' => sprintf(__('validator.dividable'), 50), 'view_fee' => $data->view_fee,], $errorStatus);
                    if ($data->charge < $fee)
                        $data->status = 'need_charge';
                    elseif ($data->status == 'need_charge')
                        $data->status = 'active';
                    $data->view_fee = $fee;

                    $data->save();
                    return response()->json(['message' => __('updated_successfully'), 'status' => $data->status, 'view_fee' => $data->view_fee,], $successStatus);
                    break;
                case 'charge':

                    if (!$user->wallet_active)
                        return response()->json(['message' => __('help_activate_wallet'), 'charge' => $data->charge], $errorStatus);

                    if ($user->wallet + $data->charge < $charge)
                        return response()->json(['message' => __('low_wallet'), 'charge' => $data->charge], $errorStatus);
                    else {
                        $user->wallet -= ($charge - $data->charge);
                        $data->charge = $charge;
                        $data->status = $data->status == "need_charge" ? "active" : $data->status;
                        $data->save();
                        $user->save();
                        return response()->json(['message' => __('charged_successfully'), 'charge' => $data->charge, 'status' => $data->status, 'wallet' => $user->wallet], $successStatus);

                    }
                case  'upload-img' :

                    if (!$request->img) //  add extra image
                        return response()->json(['errors' => [__('file_not_exists')],], $errorStatus);

                    Util::createImage($request->img, Variable::IMAGE_FOLDERS[Banner::class], "$id");
                    if ($data) {
                        $data->status = 'review';
                        $data->save();
                    }
                    return response()->json(['message' => __('updated_successfully_and_active_after_review')], $successStatus);

                case  'upload-banner' :
                    if (!$request->file('banner')) //  add extra image
                        return response()->json(['errors' => [__('file_not_exists')],], $errorStatus);

                    Util::createFile($request->file('banner'), Variable::IMAGE_FOLDERS[Banner::class], "$id-file");
                    if ($data) {
                        $data->status = 'review';
                        $data->save();
                    }
                    return response()->json(['message' => __('updated_successfully_and_active_after_review')], $successStatus);

                case 'operator-finish':
                    return Project::operatorFinish($data->projectItem);

                    return back()->with(['flash_status' => 'danger', 'flash_message' => __('response_error')]);

            }
        } elseif ($data) {


            $request->merge([
                'status' => $user->isAdmin() ? $request->status : 'review',
//                'is_active' => false,
                'slug' => str_slug($request->name),
            ]);

            if ($user->isAdmin()) {
                $data->owner_id = $request->owner_id;
                $newStatus = $request->status;
                $oldStatus = $data->status;
                switch ($newStatus) {
                    case 'reject':
                        Notification::updateOrCreate([
                            'data_id' => $data->id,],
                            ['type' => 'banner_reject', 'subject' => __('banner_need_change'), 'description' => json_encode($request->message), 'owner_id' => $data->owner_id]
                        );
                        break;
                    case 'active':
                        Notification::updateOrCreate([
                            'data_id' => $data->id,],
                            ['type' => 'banner_approve', 'subject' => __('banner_approved'), 'description' => null, 'owner_id' => $data->owner_id]
                        );
//                        if ($data->view_fee > $data->charge) {
//                            $request->status = 'need_charge';
//                            $request->merge([
//                                'status' => 'need_charge',
//                            ]);
//                        }

                        break;
                    case 'review':
                        Notification::where('data_id', $data->id)->delete();
                        break;
                }
                if ($oldStatus != $newStatus && in_array($newStatus, ['active', 'reject'])) {
                    $owner = User::find($data->owner_id);
                    if ($owner) {
                        $owner->notifications++;
                        $owner->save();
                    }
                }
            } else {
                unset($request->owner_id);
            }
            $oldName = $data->name;
//            $data->name = $request->tags;
//            $data->tags = $request->tags;
//            dd($request->tags);
            if ($data->update($request->all())) {

                if ($oldName != $request->name)
                    Transfer::where('item_type', 'banner')->where('item_id', $data->id)->where('status', '!=', 'done')->update(['name' => $data->name]);

                $res = ['flash_status' => 'success', 'flash_message' => __($user->isAdmin() ? 'updated_successfully' : 'updated_successfully_and_active_after_review')];
//                dd($request->all());
                Telegram::log(null, 'banner_edited', $data);
            } else    $res = ['flash_status' => 'danger', 'flash_message' => __('response_error')];
            return back()->with($res);
        }

        return response()->json($response, $errorStatus);
    }

    public function index()
    {
        return Inertia::render('Banner/Index', [
            'categories' => Banner::categories(),
        ]);

    }

    public function create(BannerRequest $request)
    {


        $user = auth()->user()/* ?? auth('api')->user()*/
        ;

//        $phone = $request->phone;
//        $fullname = $request->fullname;
//        if (!$user) {
//            //find user or create new user
//            $user = User::where('phone', $phone)->first();
//            if (!$user)
//                $user = User::create(['fullname' => $fullname, 'phone' => $phone, 'password' => Hash::make($request->password), 'ref_id' => User::makeRefCode()]);
//
//        }
        if (!$user) {
            $res = ['flash_status' => 'danger', 'flash_message' => __('response_error')];
            return back()->with($res);
        }
        if ($user->is_block) {
            $res = ['flash_status' => 'danger', 'flash_message' => __('user_is_blocked')];
            return back()->with($res);
        }
        if (!$request->uploading) { //send again for uploading images

            return back()->with(['resume' => true]);
        }

        if (!auth()->user())
            auth()->login($user);
        $request->merge([
            'owner_id' => $user->id,
            'slug' => str_slug($request->name),
            'status' => 'review',
        ]);

        $banner = Banner::create($request->all());

        if ($banner) {
            $res = ['flash_status' => 'success', 'flash_message' => __('created_successfully_and_activete_after_review')];

            Util::createImage($request->img, Variable::IMAGE_FOLDERS[Banner::class], "$banner->id");
            Util::createFile($request->file('banner'), Variable::IMAGE_FOLDERS[Banner::class], "$banner->id-file");

//            SMSHelper::deleteCode($phone);
            Telegram::log(null, 'banner_created', $banner);
        } else    $res = ['flash_status' => 'danger', 'flash_message' => __('response_error')];
        return to_route('panel.banner.index')->with($res);
    }

    public function searchPanel(Request $request)
    {
        $user = $request->user();
        $search = $request->search;
        $page = $request->page ?: 1;
        $orderBy = $request->order_by ?: 'id';
        $dir = $request->dir ?: 'DESC';
        $paginate = $request->paginate ?: 24;

        $query = Banner::query();
        $query = $query->select('id', 'name', 'designer', 'view_fee', 'meta', 'status', 'view', 'category_id');

        if ($user->role == 'us')
            $query = $query->where('owner_id', $user->id);

        if ($search)
            $query = $query->where('name', 'like', "%$search%");

        return $query->orderBy($orderBy, $dir)->paginate($paginate, ['*'], 'page', $page);
    }

    public function search(Request $request)
    {
//        $user = auth()->user();
        $search = $request->search;
        $page = $request->page ?: 1;
        $orderBy = 'created_at';
        $dir = $request->dir ?: 'DESC';
        $paginate = $request->paginate ?: 24;

        $query = Banner::join('articles', function ($join) {
            $join->on('banners.article_id', '=', 'articles.id')
                ->whereIn('articles.status', ['active', 'need_charge'])
                ->where('articles.lang', app()->getLocale());

        })->select('banners.id', 'articles.id as article_id', 'articles.status as status', 'articles.view as view', 'articles.viewer as viewer', 'articles.view_fee as view_fee', 'articles.category_id as category_id', 'title', 'name')
            ->orderBy('articles.status', 'ASC')
            ->orderByRaw("IF(articles.charge >= articles.view_fee, articles.view_fee, articles.id) DESC");
        if ($search)
            $query->where('title', 'like', "%$search%");

        return $query->get()
            ->groupby('category_id')->map(function ($e, $idx) use ($paginate) {

//                $e = new \stdClass();
//                $e->data = $el;
//                $e->total = $paginate;
//                $e->current_page = 1;
                return $e->take($paginate);
            });


        $query = Banner::query();
//        $seen = session()->get('site_views', []);
        $query = $query->select('id', 'name', 'designer', 'view', 'view_fee', 'status', 'category_id', 'created_at',);
        //        $query = $query->select('charge', 'status', 'view_fee');
        $query = $query
            ->whereIn('status', ['active', 'need_charge'])
            ->whereLang(app()->getLocale());

        if ($search)
            $query = $query->where('name', 'like', "%$search%");

        $query = $query->whereNotNull('article_id');


        $query = $query
            ->orderBy('status', 'ASC')
            ->orderByRaw("IF(charge >= view_fee, view_fee, id) DESC");
        return $query->paginate($paginate, ['*'], 'page', $page);
    }

    public function view(Request $request, $banner)
    {
        $message = null;
        $link = null;

        $data = Banner::where('id', $banner)->with('owner:id,fullname,phone')->first();

        if (!$data || !in_array($data->status, ['active', 'need_charge'])) {
            $message = __('no_results');
            $link = route('banner.index');
            $data = ['name' => __('no_results'),];
        } elseif (!$request->iframe) {
            event(new Viewed($data, BannerTransaction::class));
        }

        return Inertia::render('Banner/View', [
            'error_message' => $message,
            'error_link' => $link,
            'data' => $data,
            'categories' => Banner::categories(),
        ]);

    }
}
