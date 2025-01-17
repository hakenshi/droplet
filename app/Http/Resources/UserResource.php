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
            'email' => $this->email,
            'name' => $this->name ?? null,
            'surname' => $this->surname ?? null,
            'password' => $this->password ?? '',
            'created_at' => $this->created_at,
        ];
    }
}
