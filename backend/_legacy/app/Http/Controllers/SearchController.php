<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SearchController extends Controller
{
    public function findUserByUsername(Request $request)
    {

        $username = $request->query('username');
        $user = User::where('username', 'like', "%$username%")->first();

        if ($user) {
            return new UserResource($user);
        }

        throw new NotFoundHttpException('User not found.');
    }

    public function findPostsByUsername(Request $request)
    {
        $username = $request->query('username');
        $user = User::where('username', 'like', "%$username%")->with('posts')->first();

        if (count($user->posts) > 0) {
            return new PostResource($user->posts);
        }

        throw new NotFoundHttpException('No posts were found.');
    }
}
