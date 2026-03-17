<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostImages extends Model
{
    protected $fillable = [
        'post_id',
        'url'
    ];

    public function post(): belongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
