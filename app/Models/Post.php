<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    protected $fillable = [
        'user_id',
        'content',
        'donation_goal'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function postImages(): hasMany
    {
        return $this->hasMany(PostImages::class);
    }
}
