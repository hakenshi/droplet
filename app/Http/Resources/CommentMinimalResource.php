<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentMinimalResource extends JsonResource
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
            'id' => $this->id,
            'id_string' => (string)$this->id,
            'content' => $this->content,
            'created_at' => $this->created_at,
            'post_comments' => [
                'count' => $this->resource->whereNull('parent_id')->count(),
                'replies_count' => $this->resource->replies()->count(),
            ],
            'post_likes' => [
                'count' => method_exists($this->resource, 'likes')
                    ? $this->resource->likes->count()
                    : $this->resource->commentLikes->count(),

                'has_liked' => method_exists($this->resource, 'likes')
                    ? $this->resource->likes()->where('user_id', \request()->user()->id)->exists()
                    : $this->resource->commentLikes()->where('user_id', \request()->user()->id)->exists(),
            ],
        ];
    }
}
