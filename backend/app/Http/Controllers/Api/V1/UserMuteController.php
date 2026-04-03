<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Concerns\ConstrainsPagination;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ToggleUserMuteRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\UserMute;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class UserMuteController extends Controller
{
    use ConstrainsPagination;

    private const string STATUS_MUTED = 'muted';

    private const string STATUS_UNMUTED = 'unmuted';

    public function index(Request $request): AnonymousResourceCollection
    {
        $mutedUsers = User::query()
            ->whereIn('id', UserMute::query()
                ->select('muted_user_id')
                ->where('muter_id', $request->user()->id))
            ->withCount(['followers', 'followings', 'posts'])
            ->orderByDesc('created_at')
            ->paginate($this->resolvePerPage($request));

        return UserResource::collection($mutedUsers);
    }

    public function toggle(ToggleUserMuteRequest $request, User $user): JsonResponse
    {
        $muter = $request->user();

        if ($muter->is($user)) {
            return response()->json([
                'message' => 'You cannot mute yourself.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $existingMute = UserMute::query()
            ->where('muter_id', $muter->id)
            ->where('muted_user_id', $user->id)
            ->first();

        if ($existingMute !== null) {
            $this->authorize('delete', $existingMute);

            $existingMute->delete();

            return response()->json([
                'message' => 'User unmuted.',
                'status' => self::STATUS_UNMUTED,
            ]);
        }

        UserMute::create([
            'muter_id' => $muter->id,
            'muted_user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'User muted.',
            'status' => self::STATUS_MUTED,
        ], Response::HTTP_CREATED);
    }
}
