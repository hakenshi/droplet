<?php

namespace App\Http\Requests\Api;

use App\Models\Comment;
use App\Models\Post;
use App\Models\Report;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $reportable = $this->resolveReportable();
        $user = $this->user();

        return $reportable !== null
            && (bool) $user?->can('create', Report::class)
            && (bool) $user?->can('view', $reportable);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'reason' => ['required', 'string', 'max:120'],
            'details' => ['nullable', 'string', 'max:2000'],
        ];
    }

    private function resolveReportable(): Post|Comment|null
    {
        $post = $this->route('post');
        if ($post instanceof Post) {
            return $post;
        }

        $comment = $this->route('comment');
        if ($comment instanceof Comment) {
            return $comment;
        }

        return null;
    }
}
