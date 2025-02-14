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
            'author' => [
                'id' => $this->user->id,
                'profile_image' => $this->user->profile_image,
                'username' => $this->user->username,
                'name' => $this->user->name,
                'surname' => $this->user->surname,
            ],
            'post' => [
                'id' => $this->id,
                'content' => $this->content,
                'post_images' => $this->postImages ? $this->postImages->map(fn($item) => $item->url)->toArray() : null,
                'post_comments' => [
                    'count' => $this->comments->count(),
                    'comments' => $this->comments()->where('parent_id', null)->get(),
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
