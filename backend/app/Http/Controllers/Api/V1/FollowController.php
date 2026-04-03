<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Concerns\ConstrainsPagination;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ToggleFollowRequest;
use App\Http\Resources\UserResource;
use App\Models\Follow;
use App\Models\FollowRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
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
        $isPrivateProfile = $user->private_profile;

        if ($follower->is($user)) {
            return response()->json([
                'message' => 'You cannot follow yourself.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($user->isBlockedWith($follower)) {
            return response()->json([
                'message' => 'You cannot follow this user.',
            ], Response::HTTP_FORBIDDEN);
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

        $followRequest = FollowRequest::query()
            ->where('requester_id', $follower->id)
            ->where('recipient_id', $user->id)
            ->first();

        if ($isPrivateProfile) {
            if ($followRequest !== null) {
                $followRequest->delete();

                return response()->json([
                    'message' => 'Follow removed.',
                    'status' => self::STATUS_UNFOLLOWED,
                ]);
            }

            FollowRequest::create([
                'requester_id' => $follower->id,
                'recipient_id' => $user->id,
            ]);

            return response()->json([
                'message' => 'Follow request processed.',
                'status' => self::STATUS_REQUESTED,
            ], Response::HTTP_CREATED);
        }

        if ($followRequest !== null) {
            $followRequest->delete();
        }

        Follow::create([
            'follower_id' => $follower->id,
            'following_id' => $user->id,
            'accepted_at' => now(),
        ]);

        return response()->json([
            'message' => 'Follow request processed.',
            'status' => self::STATUS_FOLLOWING,
        ], Response::HTTP_CREATED);
    }

    public function followers(Request $request, User $user): AnonymousResourceCollection
    {
        $this->authorize('view', $user);

        return $this->paginateUsersFromIds($request, Follow::query()
            ->select('follower_id')
            ->where('following_id', $user->id)
            ->whereNotNull('accepted_at'));
    }

    public function following(Request $request, User $user): AnonymousResourceCollection
    {
        $this->authorize('view', $user);

        return $this->paginateUsersFromIds($request, Follow::query()
            ->select('following_id')
            ->where('follower_id', $user->id)
            ->whereNotNull('accepted_at'));
    }

    public function pending(Request $request): AnonymousResourceCollection
    {
        $currentUser = $request->user();

        return $this->paginateUsersFromIds($request, FollowRequest::query()
            ->select('requester_id')
            ->where('recipient_id', $currentUser->id));
    }

    public function accept(FollowRequest $followRequest): JsonResponse
    {
        $this->authorize('update', $followRequest);

        $existingFollow = Follow::query()
            ->where('follower_id', $followRequest->requester_id)
            ->where('following_id', $followRequest->recipient_id)
            ->first();

        if ($existingFollow !== null) {
            $followRequest->delete();

            return response()->json([
                'message' => 'Follow request already accepted.',
                'status' => self::STATUS_FOLLOWING,
            ]);
        }

        Follow::create([
            'follower_id' => $followRequest->requester_id,
            'following_id' => $followRequest->recipient_id,
            'accepted_at' => now(),
        ]);

        $followRequest->delete();

        return response()->json([
            'message' => 'Follow request accepted.',
            'status' => self::STATUS_FOLLOWING,
        ]);
    }

    public function reject(FollowRequest $followRequest): JsonResponse
    {
        $this->authorize('update', $followRequest);

        $followRequest->delete();

        return response()->json([
            'message' => 'Follow request rejected.',
            'status' => self::STATUS_UNFOLLOWED,
        ]);
    }

    public function cancel(FollowRequest $followRequest): JsonResponse
    {
        $this->authorize('delete', $followRequest);

        $followRequest->delete();

        return response()->json([
            'message' => 'Follow request cancelled.',
            'status' => self::STATUS_UNFOLLOWED,
        ]);
    }

    private function paginateUsersFromIds(Request $request, Builder $idsQuery): AnonymousResourceCollection
    {
        $users = User::query()
            ->whereIn('id', $idsQuery)
            ->withCount(['followers', 'followings', 'posts'])
            ->orderByDesc('created_at')
            ->paginate($this->resolvePerPage($request));

        return UserResource::collection($users);
    }
}
