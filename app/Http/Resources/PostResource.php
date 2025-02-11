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
                'profile_image' => $this->user->profile_image,
                'username' => $this->user->username,
                'name' => $this->user->name,
                'surname' => $this->user->surname,
            ],
            'post' => [
                'id' => $this->id,
                'content' => $this->content,
                'post_image' => $this->postImages ? $this->postImages->map(fn($item) => $item->url)->toArray() : null,
                'created_at' => $this->created_at
            ],
        ];
    }
}
