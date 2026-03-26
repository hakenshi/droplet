<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\TogglePostLikeRequest;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class PostLikeController extends Controller
{
    private const string STATUS_LIKED = 'liked';

    private const string STATUS_UNLIKED = 'unliked';

    public function toggle(TogglePostLikeRequest $request, Post $post): JsonResponse
    {
        $user = $request->user();

        $like = $post->likes()->whereBelongsTo($user)->first();

        if ($like !== null) {
            $like->delete();

            return response()->json([
                'message' => 'Post like removed.',
                'status' => self::STATUS_UNLIKED,
                'likes_count' => $post->likes()->count(),
                'has_liked' => false,
            ]);
        }

        $post->likes()->create([
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Post liked.',
            'status' => self::STATUS_LIKED,
            'likes_count' => $post->likes()->count(),
            'has_liked' => true,
        ], Response::HTTP_CREATED);
    }
}
