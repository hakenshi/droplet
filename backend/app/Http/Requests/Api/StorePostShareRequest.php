<?php

namespace App\Http\Requests\Api;

use App\Models\Post;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePostShareRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $post = $this->route('post');

        return $post instanceof Post
            && (bool) $this->user()?->can('view', $post);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'channel' => [
                'nullable',
                'string',
                Rule::in(['app', 'copy', 'twitter', 'whatsapp']),
            ],
            'target_url' => ['nullable', 'url'],
        ];
    }

    protected function prepareForValidation(): void
    {
        if (! $this->filled('channel')) {
            $this->merge(['channel' => 'app']);
        }
    }
}
