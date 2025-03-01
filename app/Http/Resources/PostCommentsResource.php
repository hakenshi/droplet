<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostCommentsResource extends JsonResource
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
                'id_string' => str($this->resource->id),
                'post_redirect_id' => method_exists($this->resource, 'likes') ? str($this->resource->id) : str($this->post->id),

                'content' => $this->content,
                'post_images' => $this->postImages ? $this->postImages->map(fn($item) => $item->url)->toArray() : null,
                'post_type' => method_exists($this->resource, 'comments') ? 'post' : 'comment',
                'post_comments' => [
                    'count' => method_exists($this->resource, 'comments')
                        ? $this->resource->comments()->whereNull('parent_id')->count()
                        : $this->resource->replies()->whereNull('parent_id')->count(),

                    'replies_count' => method_exists($this->resource, 'comments')
                        ? $this->resource->comments()->whereNotNull('parent_id')->count()
                        : null,

                ],
                'post_likes' => [
                    'count' => method_exists($this->resource, 'likes')
                        ? $this->resource->likes->count()
                        : $this->resource->commentLikes->count(),

                    'has_liked' => method_exists($this->resource, 'likes')
                        ? $this->resource->likes()->where('user_id', \request()->user()->id)->exists()
                        : $this->resource->commentLikes()->where('user_id', \request()->user()->id)->exists(),
                ],
                'created_at' => $this->created_at,
            ],
        ];
    }
}
