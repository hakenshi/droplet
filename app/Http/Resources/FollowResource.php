<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FollowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = $request->user();

        $is_following = $this->following->contains('id', $user->id);
        $is_follower = $this->followers->contains('id', $user->id);

        return [
            'followers' => [
                'count' => $this->followers()->count(),
                'user_followers' => UserResource::collection($this->followers),
                'is_follower' => $is_follower,
            ],
            'following' => [
                'count' => $this->following()->count(),
                'following_users' => UserResource::collection($this->following),
                'is_following' => $is_following,
            ],
        ];
    }
}
