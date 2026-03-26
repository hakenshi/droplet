<?php

namespace App\Http\Requests\Api;

use App\Models\Comment;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $post = $this->route('post');

        return (bool) $this->user()?->can('create', Comment::class)
            && $post !== null
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
            'content' => ['required', 'string'],
            'parent_id' => [
                'nullable',
                'ulid',
                Rule::exists('comments', 'id'),
            ],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            $parentId = $this->input('parent_id');

            if (! $parentId) {
                return;
            }

            $post = $this->route('post');
            $parentComment = Comment::query()->find($parentId);

            if ($parentComment === null || $post === null || $parentComment->post_id !== $post->id) {
                $validator->errors()->add('parent_id', 'The selected parent comment is invalid for this post.');
            }
        });
    }
}
