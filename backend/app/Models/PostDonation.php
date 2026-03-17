<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostDonation extends Model
{
    protected $fillable = [
        'post_id',
        'user_id',
        'amount',
        'payment_status',
    ];

    public function post(): BelongsTo{
        return $this->belongsTo(Post::class);
    }

}
