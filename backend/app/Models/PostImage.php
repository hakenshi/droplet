<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['post_id', 'url'])]
class PostImage extends Model
{
    use HasUlids;

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
