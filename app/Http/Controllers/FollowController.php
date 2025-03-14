<?php

namespace App\Http\Controllers;

use App\Http\Resources\FollowResource;
use App\Models\Follow;
use App\Models\User;
use Illuminate\Http\Request;

class FollowController extends Controller
{

    public function show(string $username)
    {

        $user = User::where('username', $username)->firstOrFail();

        return new FollowResource($user);
    }

    public function followUser(Request $request)
    {
        $data = $request->all();
        $user = $request->user();
        $newFollow = Follow::create([
            'following_id' => $user->id, // id of the user who is following
            'follower_id' => $data['follower_id'], // id of the user who is being followed
            'status' => $user->private_profile ? 'pending' : "accepted"
        ]);

        return response()->json($newFollow, 201);
    }

    public function unfollowUser(string $username)
    {
        $user = User::where("username", $username)->firstOrFail();
        $user->following()->detach();
        return response()->noContent();
    }

}
