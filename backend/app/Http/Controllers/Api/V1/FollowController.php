<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ToggleFollowRequest;
use App\Models\Follow;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class FollowController extends Controller
{
    private const string STATUS_FOLLOWING = 'following';

    private const string STATUS_REQUESTED = 'requested';

    private const string STATUS_UNFOLLOWED = 'unfollowed';

    public function toggle(ToggleFollowRequest $request, User $user): JsonResponse
    {
        $follower = $request->user();

        if ($follower->is($user)) {
            return response()->json([
                'message' => 'You cannot follow yourself.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $follow = Follow::query()
            ->where('follower_id', $follower->id)
            ->where('following_id', $user->id)
            ->first();

        if ($follow !== null) {
            $follow->delete();

            return response()->json([
                'message' => 'Follow removed.',
                'status' => self::STATUS_UNFOLLOWED,
            ]);
        }

        Follow::create([
            'follower_id' => $follower->id,
            'following_id' => $user->id,
            'accepted_at' => $user->private_profile ? null : now(),
        ]);

        return response()->json([
            'message' => 'Follow request processed.',
            'status' => $user->private_profile ? self::STATUS_REQUESTED : self::STATUS_FOLLOWING,
        ], Response::HTTP_CREATED);
    }
}
