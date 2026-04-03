<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Concerns\ConstrainsPagination;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserPostController extends Controller
{
    use ConstrainsPagination;

    public function index(
        Request $request,
        User $user,
    ): AnonymousResourceCollection {
        $this->authorize('view', $user);

        $posts = Post::query()
            ->whereBelongsTo($user)
            ->with(['user', 'images'])
            ->withCount('comments')
            ->orderByDesc('created_at')
            ->paginate($this->resolvePerPage($request));

        return PostResource::collection($posts);
    }

    public function liked(
        Request $request,
        User $user,
    ): AnonymousResourceCollection {
        $this->authorize('view', $user);

        $posts = Post::query()
            ->visibleTo($request->user())
            ->whereHas(
                'likes',
                fn (Builder $builder) => $builder->whereBelongsTo($user),
            )
            ->with(['user', 'images'])
            ->withCount('comments')
            ->orderByDesc('created_at')
            ->paginate($this->resolvePerPage($request));

        return PostResource::collection($posts);
    }
}
