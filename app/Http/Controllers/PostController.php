<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Resources\PostCommentsResource;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\PostLikes;
use App\Models\User;
use Godruoyi\Snowflake\Snowflake;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PostResource::collection(Post::orderBy('created_at', 'desc')->with('comments')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request, Snowflake $snowflake)
    {
        try {
            $data = $request->validated();
            $data['id'] = $snowflake->id();

            $post = Post::create($data);
            return response()->json($post, 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], $e->getCode());
        }
    }
    public function storeLike(Request $request, Snowflake $snowflake)
    {
        $data = $request->validate([
            'post_id' => 'required',
            'user_id' => 'required'
        ]);

        $data['id'] = $snowflake->id();

        $exists = PostLikes::where('post_id', $data['post_id'])->where('user_id', $data['user_id'])->first();
        if ($exists) {
            $exists->delete();
            return response()->json([], 200);
        } else {
            PostLikes::create($data);
            return response()->json([], 201);
        }
    }

    public function showUserPosts(string $username)
    {
        $user = User::where('username', $username)->firstOrFail();
        $userPosts = $user->posts()->orderBy('created_at', 'desc')->get();
        return PostResource::collection($userPosts);
    }

    public function showUserLikedPosts(string $username)
    {
        $user = User::where('username', $username)->firstOrFail();

        $userLikedPosts = $user->likedPosts;
        $userLikedComments = $user->likedComments;
        $mergedResult = $userLikedPosts->merge($userLikedComments)->sortByDesc('created_at')->values();

        return PostCommentsResource::collection($mergedResult);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(PostRequest $request, Post $post)
    {
        $data = $request->all();
        $post->update($data);
        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json([], 204);
    }
}
