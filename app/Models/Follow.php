<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Follow extends Model
{
    protected $fillable = [
        'following_id',
        'follower_id',
        'status'
    ];

    public function following(): BelongsTo
    {
        return $this->belongsTo(User::class, 'following_id');
    }
    public function followers(): BelongsTo
    {
        return $this->belongsTo(User::class, 'follower_id');
    }

}
