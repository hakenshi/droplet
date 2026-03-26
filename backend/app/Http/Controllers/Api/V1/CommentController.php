<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Concerns\ConstrainsPagination;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreCommentRequest;
use App\Http\Requests\Api\UpdateCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class CommentController extends Controller
{
    use ConstrainsPagination;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Post $post): AnonymousResourceCollection
    {
        $this->authorize('viewAny', Comment::class);

        $comments = $post
            ->comments()
            ->with('user')
            ->latest('created_at')
            ->paginate($this->resolvePerPage($request));

        return CommentResource::collection($comments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request, Post $post): CommentResource
    {
        $comment = $post->comments()->create([
            'user_id' => $request->user()->id,
            'content' => $request->string('content')->toString(),
            'parent_id' => $request->string('parent_id')->toString() ?: null,
        ]);

        return new CommentResource($comment->load('user'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment): CommentResource
    {
        $this->authorize('view', $comment);

        return new CommentResource($comment->load('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment): CommentResource
    {
        $this->authorize('update', $comment);

        $comment->update($request->validated());

        return new CommentResource($comment->load('user'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment): JsonResponse
    {
        $this->authorize('delete', $comment);

        $comment->delete();

        return response()->json(
            [
                'message' => 'Comment removed.',
            ],
            Response::HTTP_NO_CONTENT,
        );
    }
}
