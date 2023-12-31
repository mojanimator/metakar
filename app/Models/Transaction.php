<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';
    public $timestamps = true;
    protected $fillable = [
        'title', 'type', 'user_id', 'owner_id', 'source_id', 'coupon_id', 'amount', 'created_at', 'updated_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [

    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [

    ];

//    public function getCreatedAtAttribute($value)
//    {
//        if (!$value) return $value;
//        return \Morilog\Jalali\CalendarUtils::strftime('Y/m/d | H:i', strtotime($value));
//    }
    public static function fillAllOwnerIds(string $ip, $userId)
    {
        SiteTransaction::where('ip', $ip)->where('owner_id', null)->update(['owner_id' => $userId]);
        ArticleTransaction::where('ip', $ip)->where('owner_id', null)->update(['owner_id' => $userId]);
        BannerTransaction::where('ip', $ip)->where('owner_id', null)->update(['owner_id' => $userId]);
        BusinessTransaction::where('ip', $ip)->where('owner_id', null)->update(['owner_id' => $userId]);
        PodcastTransaction::where('ip', $ip)->where('owner_id', null)->update(['owner_id' => $userId]);
        VideoTransaction::where('ip', $ip)->where('owner_id', null)->update(['owner_id' => $userId]);

        UserTransaction::where('ip', $ip)->where('owner_id', null)->update(['owner_id' => $userId]);

    }
}
