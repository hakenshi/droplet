<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Concerns\ConstrainsPagination;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class PostSaveController extends Controller
{
    use ConstrainsPagination;

    private const string STATUS_SAVED = 'saved';

    private const string STATUS_UNSAVED = 'unsaved';

    public function index(Request $request, User $user): AnonymousResourceCollection
    {
        $this->authorize('view', $user);

        $savedPosts = Post::query()
            ->visibleTo($request->user())
            ->whereHas(
                'saves',
                fn (Builder $builder): Builder => $builder
                    ->where('user_id', $user->id),
            )
            ->with(['user', 'images'])
            ->withCount('comments')
            ->orderByDesc('created_at')
            ->paginate($this->resolvePerPage($request));

        return PostResource::collection($savedPosts);
    }

    public function toggle(Request $request, Post $post): JsonResponse
    {
        $this->authorize('view', $post);

        $user = $request->user();

        $existingSave = $post->saves()
            ->whereBelongsTo($user)
            ->first();

        if ($existingSave !== null) {
            $this->authorize('delete', $existingSave);

            $existingSave->delete();

            return response()->json([
                'message' => 'Post save removed.',
                'status' => self::STATUS_UNSAVED,
                'saves_count' => $post->saves()->count(),
                'has_saved' => false,
            ]);
        }

        $post->saves()->create([
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Post saved.',
            'status' => self::STATUS_SAVED,
            'saves_count' => $post->saves()->count(),
            'has_saved' => true,
        ], Response::HTTP_CREATED);
    }

    public function destroy(Request $request, Post $post): JsonResponse
    {
        $this->authorize('view', $post);

        $existingSave = $post->saves()
            ->whereBelongsTo($request->user())
            ->first();

        if ($existingSave === null) {
            return response()->json([
                'message' => 'Post save was already removed.',
                'status' => self::STATUS_UNSAVED,
                'saves_count' => $post->saves()->count(),
                'has_saved' => false,
            ], Response::HTTP_OK);
        }

        $this->authorize('delete', $existingSave);

        $existingSave->delete();

        return response()->json([
            'message' => 'Post save removed.',
            'status' => self::STATUS_UNSAVED,
            'saves_count' => $post->saves()->count(),
            'has_saved' => false,
        ]);
    }
}
