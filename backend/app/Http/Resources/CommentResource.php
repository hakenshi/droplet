<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            'comment' => [
                'id' => $this->id,
                'id_string' => "$this->id",
                'post_id' => $this->post->id,
                'post_id_string' => str($this->post->id),
                'parent_id' => $this->parent_id ?? null,
                'parent_id_string' => "$this->parent_id" ?? null,
                'content' => $this->content,
                'post_replies' => [
                    'count' => $this->replies->count(),
                    'replies' => $this->replies,
                ],
                'post_likes' => [
                    'count' => $this->commentLikes->count(),
                    'has_liked' => $this->commentLikes()->where('user_id', \request()->user()->id)->exists(),
                ],
                'created_at' => $this->created_at,
            ],
        ];
    }
}
