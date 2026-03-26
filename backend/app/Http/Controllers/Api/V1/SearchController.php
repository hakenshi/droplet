<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Concerns\ConstrainsPagination;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\SearchRequest;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SearchController extends Controller
{
    use ConstrainsPagination;

    public function users(SearchRequest $request): AnonymousResourceCollection
    {
        $query = $request->string('query')->trim()->toString();

        $users = User::query()
            ->visibleTo($request->user())
            ->where(function (Builder $builder) use ($query): void {
                $builder
                    ->where('username', 'like', "%{$query}%")
                    ->orWhere('name', 'like', "%{$query}%");
            })
            ->withCount(['followers', 'followings', 'posts'])
            ->orderByDesc('created_at')
            ->paginate($this->resolvePerPage($request));

        return UserResource::collection($users);
    }

    public function posts(SearchRequest $request): AnonymousResourceCollection
    {
        $query = $request->string('query')->trim()->toString();

        $posts = Post::query()
            ->visibleTo($request->user())
            ->where(function (Builder $builder) use ($query): void {
                $builder
                    ->where('content', 'like', "%{$query}%")
                    ->orWhereHas('user', fn (Builder $authorBuilder) => $authorBuilder->where('username', 'like', "%{$query}%"));
            })
            ->with(['user', 'images'])
            ->withCount('comments')
            ->orderByDesc('created_at')
            ->paginate($this->resolvePerPage($request));

        return PostResource::collection($posts);
    }
}
