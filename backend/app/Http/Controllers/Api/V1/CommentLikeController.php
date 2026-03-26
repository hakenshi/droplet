<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ToggleCommentLikeRequest;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CommentLikeController extends Controller
{
    private const string STATUS_LIKED = 'liked';

    private const string STATUS_UNLIKED = 'unliked';

    public function toggle(ToggleCommentLikeRequest $request, Comment $comment): JsonResponse
    {
        $user = $request->user();

        $like = $comment->commentLikes()->whereBelongsTo($user)->first();

        if ($like !== null) {
            $like->delete();

            return response()->json([
                'message' => 'Comment like removed.',
                'status' => self::STATUS_UNLIKED,
                'likes_count' => $comment->commentLikes()->count(),
                'has_liked' => false,
            ]);
        }

        $comment->commentLikes()->create([
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Comment liked.',
            'status' => self::STATUS_LIKED,
            'likes_count' => $comment->commentLikes()->count(),
            'has_liked' => true,
        ], Response::HTTP_CREATED);
    }
}
