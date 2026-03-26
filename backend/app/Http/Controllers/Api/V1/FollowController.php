<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Concerns\ConstrainsPagination;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ToggleFollowRequest;
use App\Http\Resources\UserResource;
use App\Models\Follow;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class FollowController extends Controller
{
    use ConstrainsPagination;

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

    public function followers(Request $request, User $user): AnonymousResourceCollection
    {
        $this->authorize('view', $user);

        $followers = User::query()
            ->whereIn('id', Follow::query()
                ->select('follower_id')
                ->where('following_id', $user->id)
                ->whereNotNull('accepted_at'))
            ->withCount(['followers', 'followings', 'posts'])
            ->orderByDesc('created_at')
            ->paginate($this->resolvePerPage($request));

        return UserResource::collection($followers);
    }

    public function following(Request $request, User $user): AnonymousResourceCollection
    {
        $this->authorize('view', $user);

        $following = User::query()
            ->whereIn('id', Follow::query()
                ->select('following_id')
                ->where('follower_id', $user->id)
                ->whereNotNull('accepted_at'))
            ->withCount(['followers', 'followings', 'posts'])
            ->orderByDesc('created_at')
            ->paginate($this->resolvePerPage($request));

        return UserResource::collection($following);
    }
}
