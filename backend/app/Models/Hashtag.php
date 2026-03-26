<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'slug'])]
class Hashtag extends Model
{
    use HasUlids;

    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class, 'post_hashtags')
            ->withTimestamps();
    }

    public function postHashtags(): HasMany
    {
        return $this->hasMany(PostHashtag::class);
    }
}
