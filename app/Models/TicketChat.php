<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketChat extends Model
{
    use HasFactory;

    protected $table = 'ticket_chats';
    public $timestamps = false;
    protected $fillable = [
        'from_id', 'ticket_id', 'message', 'user_seen', 'admin_seen', 'created_at',
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
        'user_seen' => 'boolean',
        'admin_seen' => 'boolean'
    ];

    public function getCreatedAtAttribute($value)
    {
        if (!$value) return $value;
        return \Morilog\Jalali\CalendarUtils::strftime('Y/m/d | H:i', strtotime($value));
    }
}
