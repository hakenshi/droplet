<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use PharIo\Manifest\Author;

class ReplyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'reply' => [
                'author' => new AuthorResource($this->user),
                'id' => $this->id,
                'id_string' => (string)$this->id,
                'content' => $this->content,
                'created_at' => $this->created_at,
                'post_likes' => [
                    'count' => $this->commentLikes->count(),
                    'has_liked' => $this->commentLikes()->where('user_id', \request()->user()->id)->exists(),
                ],
                'post_replies' => [
                    'count' => $this->replies->count(),
                    'replies' => $this->replies,
                ],
            ],
            'post' => new PostResource($this->post),
            'parent_comment' => new CommentResource($this->parent),
        ];
    }
}
