<?php

namespace App\Http\Requests\Api;

use App\Models\Comment;
use App\Models\Mention;
use App\Models\Post;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMentionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (bool) $this->user()?->can('create', Mention::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'post_id' => [
                'nullable',
                'ulid',
                Rule::exists('posts', 'id'),
                'required_without:comment_id',
                'prohibited_with:comment_id',
            ],
            'comment_id' => [
                'nullable',
                'ulid',
                Rule::exists('comments', 'id'),
                'required_without:post_id',
                'prohibited_with:post_id',
            ],
            'mentioned_user_id' => ['required', 'ulid', Rule::exists('users', 'id')],
            'start_position' => ['nullable', 'integer', 'min:0'],
            'end_position' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function resolveMentionTarget(): Post|Comment
    {
        if ($this->filled('post_id')) {
            return Post::query()->findOrFail($this->string('post_id')->toString());
        }

        return Comment::query()->findOrFail($this->string('comment_id')->toString());
    }
}
