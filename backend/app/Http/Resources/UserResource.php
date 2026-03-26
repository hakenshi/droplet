<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
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
            'username' => $this->username,
            'name' => $this->name,
            'surname' => $this->surname,
            'bio' => $this->bio,
            'birth_date' => $this->birth_date?->toDateString(),
            'private_profile' => (bool) $this->private_profile,
            'profile_image' => $this->profile_image !== null
                ? Storage::disk(config('filesystems.media_disk', 's3'))->url($this->profile_image)
                : null,
            'cover_image' => $this->cover_image !== null
                ? Storage::disk(config('filesystems.media_disk', 's3'))->url($this->cover_image)
                : null,
            'stats' => [
                'posts_count' => (int) $this->whenHas('posts_count', $this->posts_count, 0),
                'followers_count' => (int) $this->whenHas('followers_count', $this->followers_count, 0),
                'followings_count' => (int) $this->whenHas('followings_count', $this->followings_count, 0),
            ],
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
