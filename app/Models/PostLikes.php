<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostLikes extends Model
{
    protected $fillable = [
        'post_id',
        'user_id',
    ];

    public function post(): BelongsTo{
        return $this->belongsTo(Post::class);
    }
}
