<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostMinimalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'content' => $this->content,
            'post_replies' => [
                'count' => $this->replies->count(),
                'replies' => $this->replies ? PostResource::collection($this->replies) : null,
            ],
            'post_likes' => [
                'count' => $this->post->likes->count(),
                'has_liked' => $this->post->likes()->where('user_id', \request()->user()->id)->exists(),
            ],
            'created_at' => $this->created_at,
        ];
    }
}
