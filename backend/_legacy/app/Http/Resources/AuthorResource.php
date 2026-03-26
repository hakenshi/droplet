<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class AuthorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'profile_image' => $this->profile_image ? Storage::disk('public')->url($this->profile_image) : null,
            'username' => $this->username,
            'name' => $this->name,
            'surname' => $this->surname,
        ];
    }
}
