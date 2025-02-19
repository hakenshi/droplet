<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\CommentLike;
use App\Models\Post;
use Godruoyi\Snowflake\Snowflake;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Post $post)
    {
        return CommentResource::collection($post->comments()->whereNull('parent_id')->orderBy('created_at', 'desc')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Snowflake $snowflake)
    {
        $data['id'] = $snowflake->id();
        $data = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'post_id' => 'required|integer|exists:posts,id',
            'content' => 'required|string',
        ]);


        Comment::create($data);

        response()->json([], 201);
    }

    public function storeLike(Comment $comment, Request $request, Snowflake $snowflake)
    {
        $data['id'] = $snowflake->id();
        $data = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
        ]);

        $data['comment_id'] = $comment->id;

        $exists = CommentLike::where('comment_id', $comment->id)->where('user_id', $data['user_id'])->first();
        if ($exists) {
            $exists->delete();
            return new CommentResource($comment);
        } else {
            CommentLike::create($data);
            return new CommentResource($comment);
        }


    }

    public function storeReply(Request $request, Comment $comment)
    {
        $data = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'post_id' => 'required|integer|exists:posts,id',
            'content' => 'required|string',
        ]);

        $data['parent_id'] = $comment->id;

        $comment->create($data);

        return response()->json([], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        $data = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'post_id' => 'required|integer|exists:posts,id',
            'content' => 'required|string',
        ]);

        $comment->update($data);
        return new CommentResource($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
        return response()->json([], 204);
    }
}
