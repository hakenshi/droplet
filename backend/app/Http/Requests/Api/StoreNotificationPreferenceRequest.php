<?php

namespace App\Http\Requests\Api;

use App\Models\NotificationPreference;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreNotificationPreferenceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (bool) $this->user()?->can('create', NotificationPreference::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'all' => ['nullable', 'boolean'],
            'follows' => ['nullable', 'boolean'],
            'likes' => ['nullable', 'boolean'],
            'comments' => ['nullable', 'boolean'],
            'mentions' => ['nullable', 'boolean'],
            'donations' => ['nullable', 'boolean'],
        ];
    }
}
