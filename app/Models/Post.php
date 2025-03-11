<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    protected $fillable = [
        'id',
        'user_id',
        'content',
        'donation_goal'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function likes(): hasMany
    {
        return $this->hasMany(PostLikes::class);
    }

    public function comments(): hasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function postImages(): hasMany
    {
        return $this->hasMany(PostImages::class);
    }

    public function donations(): HasMany
    {
        return $this->hasMany(PostDonation::class);
    }
}
