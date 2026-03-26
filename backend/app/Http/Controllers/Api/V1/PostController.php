<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Concerns\ConstrainsPagination;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StorePostRequest;
use App\Http\Requests\Api\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\PostImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\UploadedFile\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class PostController extends Controller
{
    use ConstrainsPagination;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $this->authorize('viewAny', Post::class);

        $posts = Post::query()
            ->with(['images', 'user'])
            ->withCount('comments')
            ->orderByDesc('created_at')
            ->paginate($this->resolvePerPage($request));

        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request): PostResource
    {
        $post = $request->user()->posts()->create($request->validated());

        $this->storePostImages($post, $request->file('images', []));

        return new PostResource($post->load(['user', 'images'])->loadCount('comments'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post): PostResource
    {
        $this->authorize('view', $post);

        $post->loadMissing(['user', 'images'])->loadCount('comments');

        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post): PostResource
    {
        $this->authorize('update', $post);

        $post->update($request->validated());

        if ($request->hasFile('images')) {
            $this->deletePostImages($post);
            $this->storePostImages($post, $request->file('images', []));
        }

        return new PostResource($post->fresh(['user', 'images'])->loadCount('comments'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): JsonResponse
    {
        $this->authorize('delete', $post);

        $this->deletePostImages($post);
        $post->delete();

        return response()->json(
            [
                'message' => 'Post removed.',
            ],
            Response::HTTP_NO_CONTENT,
        );
    }

    /**
     * @param  array<int, UploadedFile|null>  $images
     */
    private function storePostImages(Post $post, array $images): void
    {
        foreach ($images as $image) {
            if ($image === null) {
                continue;
            }

            $path = Storage::disk(config('filesystems.media_disk', 's3'))->putFile('posts', $image, 'public');

            PostImage::create([
                'post_id' => $post->id,
                'url' => $path,
            ]);
        }
    }

    private function deletePostImages(Post $post): void
    {
        $post->loadMissing('images');

        foreach ($post->images as $postImage) {
            Storage::disk(config('filesystems.media_disk', 's3'))->delete($postImage->url);
            $postImage->delete();
        }
    }
}
