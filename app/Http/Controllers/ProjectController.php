<?php

namespace App\Http\Controllers;

use App\Http\Helpers\SMSHelper;
use App\Http\Helpers\Telegram;
use App\Http\Helpers\Variable;
use App\Http\Requests\ProjectRequest;
use App\Models\Article;
use App\Models\Project;
use App\Models\ProjectItem;
use App\Models\Setting;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function new(Request $request)
    {

        return Inertia::render('Project/Create', [
            'items' => array_reverse(array_column(Variable::PROJECT_ITEMS, 'name')),
        ]);
    }

    public function update(Request $request)
    {
        $user = auth()->user();
        $cmnd = $request->cmnd;
        $id = $request->id;
        $data = Project::find($id);

        if (!$data)
            return response()->json(['message' => __('project_not_found'),], Variable::ERROR_STATUS);
//        dd($request->all());
        switch ($cmnd) {
            case   'create-article':
                if (!$user->isAdmin())
                    return response()->json(['message' => __('only_admin_can_do_this'),], Variable::ERROR_STATUS);
                if (in_array($data->status, ['cancel', 'done']))
                    return response()->json(['errors' => ['status' => __('project_is_cancel_or_done'),]], Variable::ERROR_STATUS);
                if (!empty($data->article_id) && Article::find($data->article_id))
                    return response()->json(['message' => __('project_has_article_before') . "<br>" . __('article') . " $data->article_id ",], Variable::ERROR_STATUS);
                $article = Article::create([
                    'owner_id' => $user->id,
                    'title' => $data->title,
                    'author' => $user->fullname,
                ]);
                $data->article_id = $article->id;
                $data->save();
                return response()->json(['message' => __('done_successfully'), 'article_id' => $article->id,], Variable::SUCCESS_STATUS);

            case 'pay-operator':
                if (!$user->isAdmin())
                    return response()->json(['message' => __('only_admin_can_do_this'),], Variable::ERROR_STATUS);
                $request->price = intval($request->price);
                $request->op = optional($request->op)['id'] ?? $request->op;
                $request->op = intval($request->op);
                $operator = User::find($request->op);
                if ($request->price < 0)
                    return response()->json(['errors' => ['price' => sprintf(__('validator.invalid'), __('price')),]], Variable::ERROR_STATUS);
                if (!$request->op || $request->op < 1 || !$operator)
                    return response()->json(['message' => __('operator_not_found'),], Variable::ERROR_STATUS);
                $projectItem = ProjectItem::find($request->item_id);
                if (!$projectItem)
                    return response()->json(['message' => __('item_not_found'),], Variable::ERROR_STATUS);

                $projectItem->price = $request->price;
                $projectItem->operator_id = $request->op;
                $operator->wallet += $projectItem->price;
                $operator->save();
                $projectItem->payed_at = Carbon::now();
                $projectItem->status = 'done';
                Transaction::create([
                    'source_id' => $projectItem->id,
                    'title' => __('do_project') . " $data->id " . __($projectItem->type) . " $projectItem->id ",
                    'type' => "project_item_{$projectItem->id}",
                    'amount' => $projectItem->price,
                    'owner_id' => $projectItem->operator_id,
                    'coupon' => null,
                ]);
                Setting::setWallet(-$projectItem->price);
                $projectItem->save();
                return response()->json(['message' => __('added_to_operator_wallet_successfully'),], Variable::SUCCESS_STATUS);

            case 'get-project':
                if ($user->is_block || !$user->is_active) {
                    return response()->json(['message' => __('your_account_inactive_or_blocked'),], Variable::ERROR_STATUS);
                }
                $projectItem = ProjectItem::find($request->project_id);
                if (!$projectItem)
                    return response()->json(['message' => __('item_not_found'),], Variable::ERROR_STATUS);
                if ($data->status == 'cancel' || $data->status == 'done')
                    return response()->json(['message' => __('project_done_or_cancel'),], Variable::ERROR_STATUS);
                if (!$user->isAdmin() && ($data->owner_id == $user->id || $projectItem->operator_id == $user->id))
                    return response()->json(['message' => __('project_is_yours'),], Variable::ERROR_STATUS);
                $projectItem->operator_id = $user->id;
                $projectItem->status = 'progress';
                $projectItem->save();

                return response()->json(['message' => __('project_owned_successfully_you_can_access_from_projects_working'), 'owned' => true], Variable::SUCCESS_STATUS);

            case 'pay-project':
                if ($user->is_block || !$user->is_active) {
                    return response()->json(['message' => __('your_account_inactive_or_blocked'),], Variable::ERROR_STATUS);
                }
                if ($data->status != 'pay')
                    return response()->json(['message' => __('project_must_be_pay_status'),], Variable::ERROR_STATUS);
                if (!$user->isAdmin() && ($data->owner_id != $user->id))
                    return response()->json(['message' => __('project_is_not_yours'),], Variable::ERROR_STATUS);
                if (!is_numeric($data->price) || $data->price < 0)
                    return response()->json(['errors' => ['price' => sprintf(__('validator.invalid'), __('price')),]], Variable::ERROR_STATUS);

                $owner = User::find($data->owner_id);
                if (!$owner)
                    return response()->json(['message' => __('owner_not_found'),], Variable::ERROR_STATUS);

                if (intval($owner->wallet) < $data->price)
                    return response()->json(['message' => sprintf(__('wallet_insufficient'), "$data->price " . __('currency')),], Variable::ERROR_STATUS);

                $owner->wallet -= $data->price;
                if (!$owner->save())
                    return response()->json(['message' => __('pay_failed'),], Variable::ERROR_STATUS);

                $data->payed_at = Carbon::now();
                $data->status = 'progress';
                $data->save();
                Transaction::create([
                    'source_id' => $data->id,
                    'title' => __('pay_project') . " $data->id",
                    'type' => "project_pay_$data->id",
                    'amount' => -intVal($data->price),
                    'owner_id' => $data->owner_id,
                    'coupon' => null,
                ]);
                Setting::setWallet($data->price);
                return response()->json(['message' => __('project_payed_and_progress'),], Variable::SUCCESS_STATUS);

        }
//        if (!$user->isAdmin())
//            return response()->json(['message' => __('only_admin_can_do_this'),], Variable::ERROR_STATUS);

        if (mb_strlen($request->title) > 200)
            return response()->json(['errors' => ['title' => sprintf(__('validator.max_len'), __('title'), 200, mb_strlen($request->title)),]], Variable::ERROR_STATUS);

        $request->price = intval($request->price);
        if ($request->price < 0)
            return response()->json(['errors' => ['price' => sprintf(__('validator.invalid'), __('price')),]], Variable::ERROR_STATUS);

        if (!in_array($request->status, array_column(Variable::PROJECT_STATUSES, 'name')))
            return response()->json(['errors' => ['status' => sprintf(__('validator.invalid'), __('status')),]], Variable::ERROR_STATUS);

        $items = $request->items;
        $articleRows = [];
//        dd($items);
        foreach ($items as $idx => &$item) {
            $item = (object)$item;

            if (empty($item->item_id) && empty($item->new) && $item->status != 'cancel')
                return response()->json(['errors' => ["item.$idx.type" => __('select_item_or_tick_new_item_or_cancel_item')]], Variable::ERROR_STATUS);

            $item->op = optional($item->op)['id'] ?? (!empty($item->op) ? $item->op : null);

            if ($request->status == 'done' && !in_array($item->status, ['done', 'cancel']))
                return response()->json(['errors' => ["item.$idx.status" => __('done_project_items_done_cancel')]], Variable::ERROR_STATUS);

            if ($item->status == 'order' && $item->op)
                return response()->json(['errors' => ["item.$idx.op" => __('order_item_cant_have_operator')]], Variable::ERROR_STATUS);

            if (!in_array($item->status, array_column(Variable::PROJECT_STATUSES, 'name')))
                return response()->json(['errors' => ["item.$idx.status" => sprintf(__('validator.invalid'), __('status')),]], Variable::ERROR_STATUS);

            $item->price = intval($item->price);
            if ($item->price < 0)
                return response()->json(['errors' => ["item.$idx.price" => sprintf(__('validator.invalid'), __('price')),]], Variable::ERROR_STATUS);

            $expiresAt = !empty($item->remained_hours) ? intval($item->remained_hours) : null ?? 0;
            if (!is_integer($expiresAt))
                return response()->json(['errors' => ["item.$idx.expires_at" => sprintf(__('validator.invalid'), __('validity')),]], Variable::ERROR_STATUS);
            $oldRemaindedHours = $item->expires_at != null ? Carbon::now()->diffInHours($item->expires_at, false) : null;
//            dd($item->expires_at);
            if (!empty($item->remained_hours) && $oldRemaindedHours != $item->remained_hours) //time updated
                $item->expires_at = !$expiresAt || $expiresAt == 0 ? null : Carbon::now()->addHours($expiresAt);


            if (!empty($item->new)) {
                $itm = array_flip(Variable::DATA_TYPES)[$item->item_type]::create([
                    $item->item_type == 'text' ? 'title' : 'name' => $data->title,
                ]);
                $item->item_id = $itm->id;
            } elseif (optional($item->item_id)['id'] && optional($item->item_id)['type']) {
                $item->item_type = $item->item_id['type'];
                $item->item_id = $item->item_id['id'];
            }
            if ($item->item_type == 'article')
                return response()->json(['errors' => ["item.$idx.type" => __('article_cant_be_project_item')]], Variable::ERROR_STATUS);

            if ($f = ProjectItem::where('project_id', '!=', $data->id)->whereItemId($item->item_id)->whereItemType($item->item_type)->where('status', '!=', 'cancel')->first())
                return response()->json(['errors' => ["item.$idx.type" => __('item_is_in_another_project') . '<br>' . __('project') . " $f->project_id"]], Variable::ERROR_STATUS);

            unset($item->remainded_hours);
            unset($item->opText);
            unset($item->new);
//            if ($idx == 1)
//            dd($item);
            if (empty($item->id)) {
                $projectItem = ProjectItem::create([
                    'project_id' => $data->id,
                    'item_id' => $item->item_id,
                    'item_type' => $item->item_type,
                    'price' => $item->price,
                    'operator_id' => $item->op,
                    'status' => $item->status,
                    'expires_at' => $item->expires_at,
                    'chats' => !empty($item->description) ? json_encode([['user' => $user->id, 'text' => $item->description, 'created_at' => Carbon::now()->getTimestampMs()]]) : null,
                ]);
            } else {
                $projectItem = ProjectItem::whereId($item->id)->first();
                if ($projectItem) {
                    $projectItem->item_id = $item->item_id;
                    $projectItem->item_type = $item->item_type;
                    $projectItem->price = $item->price;
                    $projectItem->operator_id = $item->op;
                    $projectItem->status = $item->status;
                    $projectItem->expires_at = $item->expires_at;
                    if ($item->description) {
                        $chat = ['user' => $user->id, 'text' => $item->description, 'created_at' => Carbon::now()->getTimestampMs()];

                        $chats = json_decode($projectItem->chats) ?? [];
                        if (count($chats) > 0)
                            $chats[0] = $chat;
                        else
                            $chats = [$chat];
                        $projectItem->chats = json_encode($chats);
                    }

                    $projectItem->save();
                }


            }
            $articleRows[] = ['id' => $projectItem->item_id, 'type' => $projectItem->item_type];

        }
        //update article and update items owner if done
        $typeClass = array_flip(Variable::DATA_TYPES);
        if ($request->rewrite) {
            $article = Article::find($data->article_id);
            $content = collect(json_decode($article->content) ?? []);
            $newContent = [];
            foreach ($articleRows as $idx => $row) {
                $item = $typeClass[$row['type']]::find($row['id']);
                if ($item && $article) {
                    $title = $item->name ?? $item->title ?? $data->title;
                    $item->article_id = $article->id;
                    if ($request->status == 'done') {
                        $item->owner_id = $data->owner_id;
                        $item->status = 'active';

                    }
                    $item->save();
                    $newContent[] = ['id' => $row['id'], 'type' => $row['type'], 'value' => $title,];

                }
            }
            $articleRows = collect($articleRows);
            foreach ($content as $item) {
                if (!$articleRows->where('id', $item->id)->where('type', $item->type)->first()) {
                    $typeClass[$item['type']]::whereId($item->id)->update(['article_id', null]);
                }
            }
            //remove old items
            $article->content = json_encode($newContent);
            if ($request->status == 'done')
                $article->owner_id = $data->owner_id;
            $article->save();
        }

//        dd($items);
        $data->update([
            'title' => $request->title,
            'price' => $request->price,
            'status' => $request->status,
            'info' => json_encode(['description' => $request->description, 'items' => $request->requests]),
        ]);
        return response()->json(['message' => __('done_successfully'),], Variable::SUCCESS_STATUS);

    }

    public function edit(Request $request, $id)
    {

        $data = Project::with('items')->find($id);
        $this->authorize('edit', [User::class, $data,]);
        $users = array_merge($data->items->pluck('operator_id')->toArray(), [$data->owner_id]);
        $users = User::select('id', 'phone', 'fullname')->whereIn('id', $users)->get();
        $data->owner = $users->where('id', $data->owner_id)->first();
        $data->info = $data->info ? json_decode($data->info) : [];
        $data->description = optional($data->info)->description;
        $data->requests = optional($data->info)->items;
        if ($data->items)
            foreach ($data->items as $item) {
                $item->op = $users->where('id', $item->operator_id)->first();
                $item->remained_hours = $item->expires_at != null ? Carbon::now()->diffInHours($item->expires_at, false) : null;
                $item->description = optional(optional(json_decode($item->chats))[0])->text;
            }

        return Inertia::render('Panel/Project/Edit', [
            'article_categories' => Article::categories(),
            'article_statuses' => Variable::STATUSES,
            'project_statuses' => Variable::PROJECT_STATUSES,
            'item_types' => array_column(Variable::PROJECT_ITEMS, 'name'),
            'data' => $data,
        ]);
    }

    public function searchPanel(Request $request)
    {
        $user = $request->user();
        $search = $request->search;
        $page = $request->page ?: 1;
        $orderBy = $request->order_by ?: 'id';
        $dir = $request->dir ?: 'DESC';
        $paginate = $request->paginate ?: 24;

        $query = Project::query();
        $query = $query->select();
        if ($user->role == 'us')
            $query->where('owner_id', $user->id);

        if ($search)
            $query = $query->where(function ($q) use ($search) {
                $q->orWhere('title', 'like', "%$search%");
                foreach (array_filter(array_column(Variable::PROJECT_STATUSES, 'name'), fn($e) => str_contains(__($e), $search)) as $item) {
                    $q->orWhere('status', $item);
                }
            });

        return $query->orderBy($orderBy, $dir)
            ->paginate($paginate, ['*'], 'page', $page);
    }

    public function create(ProjectRequest $request)
    {
        $user = auth()->user()/* ?? auth('api')->user()*/
        ;
        $phone = $request->phone;
        $fullname = $request->fullname;
        $cmnd = $request->cmnd;
        if (!$user) {
            //find user or create new user
            $user = User::where('phone', $phone)->first();
            if (!$user)
                $user = User::create(['fullname' => $fullname, 'phone' => $phone, 'phone_verified' => true, 'password' => null, 'ref_id' => User::makeRefCode($phone)]);

        }
        if (!$user) {
            $res = ['flash_status' => 'danger', 'flash_message' => __('response_error')];
            return back()->with($res);
        }
        if ($user->is_block) {
            $res = ['flash_status' => 'danger', 'flash_message' => __('user_is_blocked')];
            return back()->with($res);
        }
        if (!auth()->user())
            auth()->login($user);
        $request->merge([
            'owner_id' => $user->id,
            'info' => json_encode(['description' => $request->description, 'items' => $request->items]),
            'status' => 'order',
        ]);
        $ip = $request->ip();
        if ($ip && $user)
            Transaction::fillAllOwnerIds($ip, $user->id);
        $project = Project::create($request->all());
        if ($project) {
            $res = ['flash_status' => 'success', 'flash_message' => __('order_received_and_factor_after_accept')];
            SMSHelper::deleteCode($phone);
            Telegram::log(null, 'project_created', $project);
        } else    $res = ['flash_status' => 'danger', 'flash_message' => __('response_error')];
        return to_route('panel.index')->with($res);
    }

}
