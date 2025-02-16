<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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
            'id' => $this->id,
            'username' => $this->username,
            'birth_date' => $this->birth_date ?? null,
            'profile_image' => $this->profile_image ? Storage::disk('public')->url($this->profile_image) : null,
            'cover_image' => $this->cover_image ? Storage::disk('public')->url($this->cover_image) : null,
            'bio' => $this->bio ?? null,
            'email' => $this->email,
            'name' => $this->name ?? null,
            'surname' => $this->surname ?? null,
            'created_at' => Carbon::createFromFormat('Y-m-d H:i:s', $this->created_at)->format('d/m/Y'),
        ];
    }
}
