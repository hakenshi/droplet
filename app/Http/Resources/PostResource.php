<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'author' => new AuthorResource($this->user),
            'post' => [
                'id' => $this->id,
                'id_string' => "$this->id",
                'content' => $this->content,
                'donation_goal' => $this->donation_goal ?: null,
                'post_images' => $this->postImages ? $this->postImages->map(fn($item) => $item->url)->toArray() : null,
                'post_comments' => [
                    'count' => $this->comments()->whereNull('parent_id')->count(),
                    'replies_count' => $this->comments()->whereNotNull('parent_id')->count(),
                ],
                'post_likes' => [
                    'count' => $this->likes->count(),
                    'has_liked' => $this->likes()->where('user_id', \request()->user()->id)->exists(),
                ],
                'created_at' => $this->created_at,
            ],
        ];
    }
}
