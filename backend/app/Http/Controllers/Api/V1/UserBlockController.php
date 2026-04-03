<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Concerns\ConstrainsPagination;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ToggleUserBlockRequest;
use App\Http\Resources\UserResource;
use App\Models\Follow;
use App\Models\FollowRequest;
use App\Models\User;
use App\Models\UserBlock;
use App\Models\UserMute;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class UserBlockController extends Controller
{
    use ConstrainsPagination;

    private const string STATUS_BLOCKED = 'blocked';

    private const string STATUS_UNBLOCKED = 'unblocked';

    public function index(Request $request): AnonymousResourceCollection
    {
        $blockedUsers = User::query()
            ->whereIn('id', UserBlock::query()
                ->select('blocked_id')
                ->where('blocker_id', $request->user()->id))
            ->withCount(['followers', 'followings', 'posts'])
            ->orderByDesc('created_at')
            ->paginate($this->resolvePerPage($request));

        return UserResource::collection($blockedUsers);
    }

    public function toggle(ToggleUserBlockRequest $request, User $user): JsonResponse
    {
        $blocker = $request->user();

        if ($blocker->is($user)) {
            return response()->json([
                'message' => 'You cannot block yourself.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $existingBlock = UserBlock::query()
            ->where('blocker_id', $blocker->id)
            ->where('blocked_id', $user->id)
            ->first();

        if ($existingBlock !== null) {
            $this->authorize('delete', $existingBlock);

            $existingBlock->delete();

            return response()->json([
                'message' => 'User unblocked.',
                'status' => self::STATUS_UNBLOCKED,
            ]);
        }

        UserBlock::create([
            'blocker_id' => $blocker->id,
            'blocked_id' => $user->id,
        ]);

        $this->clearRelationshipState($blocker, $user);

        return response()->json([
            'message' => 'User blocked.',
            'status' => self::STATUS_BLOCKED,
        ], Response::HTTP_CREATED);
    }

    private function clearRelationshipState(User $actor, User $target): void
    {
        Follow::query()
            ->where(function (Builder $builder) use ($actor, $target): void {
                $builder
                    ->where('follower_id', $actor->id)
                    ->where('following_id', $target->id);
            })
            ->orWhere(function (Builder $builder) use ($actor, $target): void {
                $builder
                    ->where('follower_id', $target->id)
                    ->where('following_id', $actor->id);
            })
            ->delete();

        FollowRequest::query()
            ->where(function (Builder $builder) use ($actor, $target): void {
                $builder
                    ->where('requester_id', $actor->id)
                    ->where('recipient_id', $target->id);
            })
            ->orWhere(function (Builder $builder) use ($actor, $target): void {
                $builder
                    ->where('requester_id', $target->id)
                    ->where('recipient_id', $actor->id);
            })
            ->delete();

        UserMute::query()
            ->where(function (Builder $builder) use ($actor, $target): void {
                $builder
                    ->where('muter_id', $actor->id)
                    ->where('muted_user_id', $target->id);
            })
            ->orWhere(function (Builder $builder) use ($actor, $target): void {
                $builder
                    ->where('muter_id', $target->id)
                    ->where('muted_user_id', $actor->id);
            })
            ->delete();
    }
}
