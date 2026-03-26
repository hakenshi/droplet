<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

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
            'id' => (string) $this->id,
            'content' => $this->content,
            'donation_goal' => $this->donation_goal,
            'comments_count' => (int) $this->whenHas('comments_count', $this->comments_count, 0),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
            'author' => new UserResource($this->whenLoaded('user')),
            'images' => $this->whenLoaded('images', fn () => $this->images->map(
                fn ($image) => [
                    'id' => (string) $image->id,
                    'url' => Storage::disk(config('filesystems.media_disk', 's3'))->url($image->url),
                ],
            )->values()->all()),
        ];
    }
}
