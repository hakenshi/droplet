<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Concerns\ConstrainsPagination;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreHashtagRequest;
use App\Models\Hashtag;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class HashtagController extends Controller
{
    use ConstrainsPagination;

    public function index(Request $request): AnonymousResourceCollection
    {
        $this->authorize('viewAny', Hashtag::class);

        $query = $request->query('query', '');

        $hashtags = Hashtag::query()
            ->withCount('posts')
            ->when($query !== '', function (Builder $builder) use ($query): void {
                $builder
                    ->where('name', 'like', "%{$query}%")
                    ->orWhere('slug', 'like', "%{$query}%");
            })
            ->orderBy('slug')
            ->paginate($this->resolvePerPage($request));

        $hashtags->setCollection($hashtags->getCollection()->map(function (Hashtag $hashtag) {
            return [
                'id' => (string) $hashtag->id,
                'name' => $hashtag->name,
                'slug' => $hashtag->slug,
                'posts_count' => (int) $hashtag->posts_count,
                'created_at' => $hashtag->created_at?->toIso8601String(),
            ];
        }));

        return AnonymousResourceCollection::make($hashtags->through(fn ($row) => $row));
    }

    public function store(StoreHashtagRequest $request): JsonResponse
    {
        $hashtag = Hashtag::query()->firstOrCreate([
            'slug' => $request->validated('slug'),
        ], [
            'name' => $request->validated('name'),
        ]);

        return response()->json([
            'message' => $hashtag->wasRecentlyCreated
                ? 'Hashtag created.'
                : 'Hashtag already exists.',
            'hashtag' => [
                'id' => (string) $hashtag->id,
                'name' => $hashtag->name,
                'slug' => $hashtag->slug,
            ],
        ], $hashtag->wasRecentlyCreated ? 201 : 200);
    }

    public function show(Hashtag $hashtag): JsonResponse
    {
        $this->authorize('view', $hashtag);

        return response()->json([
            'data' => [
                'id' => (string) $hashtag->id,
                'name' => $hashtag->name,
                'slug' => $hashtag->slug,
                'created_at' => $hashtag->created_at?->toIso8601String(),
            ],
        ]);
    }
}
