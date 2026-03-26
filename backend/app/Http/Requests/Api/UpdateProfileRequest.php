<?php

namespace App\Http\Requests\Api;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (bool) $this->user()?->can('update', $this->route('user'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = $this->route('user') ?? null;

        return [
            'username' => [
                'sometimes',
                'required',
                'string',
                'max:150',
                Rule::unique('users', 'username')->ignore($user instanceof User ? $user->id : null),
            ],
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'surname' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date'],
            'private_profile' => ['nullable', 'boolean'],
            'email' => [
                'sometimes',
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user instanceof User ? $user->id : null),
            ],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required_with:password', 'string', 'min:8'],
            'profile_image' => ['nullable', 'image', 'max:2048'],
            'cover_image' => ['nullable', 'image', 'max:2048'],
        ];
    }
}
