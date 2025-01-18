<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'username' => $this->username,
            'birth_date' => $this->birth_date ?? null,
            'profile_image' => $this->profile_image ?? null,
            'cover_image' => $this->cover_image ?? null,
            'bio' => $this->bio ?? null,
            'email' => $this->email,
            'name' => $this->name ?? null,
            'surname' => $this->surname ?? null,
            'password' => $this->password ?? '',
            'created_at' => $this->created_at,
        ];
    }
}
