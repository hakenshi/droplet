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
            'author' => new AuthorResource($this->user),
                'id' => $this->id,
                'id_string' => (string) $this->id,
                'content' => $this->content,
                'created_at' => $this->created_at
        ];
    }
}
