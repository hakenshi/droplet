<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Concerns\ConstrainsPagination;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreMentionRequest;
use App\Models\Mention;
use App\Models\Post;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class MentionController extends Controller
{
    use ConstrainsPagination;

    public function index(Request $request): AnonymousResourceCollection
    {
        $viewer = $request->user();

        $mentions = Mention::query()
            ->where(function (Builder $builder) use ($viewer): void {
                $builder
                    ->where('mentioned_by_user_id', $viewer->id)
                    ->orWhere('mentioned_user_id', $viewer->id);
            })
            ->with([
                'mentionedBy:id,username,name',
                'mentionedUser:id,username,name',
                'post:id,content,user_id',
                'comment:id,content,user_id,post_id',
            ])
            ->orderByDesc('created_at')
            ->paginate($this->resolvePerPage($request));

        $mentions->setCollection($mentions->getCollection()->map(function (Mention $mention): array {
            return [
                'id' => (string) $mention->id,
                'post_id' => (string) $mention->post_id,
                'comment_id' => (string) $mention->comment_id,
                'mentioned_by_user' => [
                    'id' => (string) $mention->mentionedBy->id,
                    'username' => $mention->mentionedBy->username,
                    'name' => $mention->mentionedBy->name,
                ],
                'mentioned_user' => [
                    'id' => (string) $mention->mentionedUser->id,
                    'username' => $mention->mentionedUser->username,
                    'name' => $mention->mentionedUser->name,
                ],
                'start_position' => $mention->start_position,
                'end_position' => $mention->end_position,
                'created_at' => $mention->created_at?->toIso8601String(),
            ];
        }));

        return AnonymousResourceCollection::make($mentions);
    }

    public function store(StoreMentionRequest $request): JsonResponse
    {
        $mentionable = $request->resolveMentionTarget();
        $this->authorize('view', $mentionable);

        $postId = null;
        $commentId = null;

        if ($mentionable instanceof Post) {
            $postId = (string) $mentionable->id;
        } else {
            $commentId = (string) $mentionable->id;
        }

        $mentionedUserId = $request->string('mentioned_user_id')->toString();
        $startPosition = $request->has('start_position') ? $request->integer('start_position') : null;
        $endPosition = $request->has('end_position') ? $request->integer('end_position') : null;

        $mention = Mention::query()->firstOrCreate([
            'post_id' => $postId,
            'comment_id' => $commentId,
            'mentioned_by_user_id' => $request->user()->id,
            'mentioned_user_id' => $mentionedUserId,
        ], [
            'start_position' => $startPosition,
            'end_position' => $endPosition,
        ]);

        return response()->json([
            'message' => $mention->wasRecentlyCreated ? 'Mention created.' : 'Mention already exists.',
            'mention' => [
                'id' => (string) $mention->id,
                'post_id' => $postId === null ? null : (string) $postId,
                'comment_id' => $commentId === null ? null : (string) $commentId,
                'mentioned_user_id' => $mentionedUserId,
                'start_position' => $startPosition,
                'end_position' => $endPosition,
            ],
        ], $mention->wasRecentlyCreated ? Response::HTTP_CREATED : Response::HTTP_OK);
    }

    public function show(Mention $mention): JsonResponse
    {
        $this->authorize('view', $mention);

        return response()->json([
            'data' => [
                'id' => (string) $mention->id,
                'post_id' => (string) $mention->post_id,
                'comment_id' => (string) $mention->comment_id,
                'mentioned_by_user_id' => (string) $mention->mentioned_by_user_id,
                'mentioned_user_id' => (string) $mention->mentioned_user_id,
                'start_position' => $mention->start_position,
                'end_position' => $mention->end_position,
            ],
        ]);
    }

    public function destroy(Mention $mention): JsonResponse
    {
        $this->authorize('delete', $mention);

        $mention->delete();

        return response()->json([
            'message' => 'Mention removed.',
        ], Response::HTTP_OK);
    }
}
