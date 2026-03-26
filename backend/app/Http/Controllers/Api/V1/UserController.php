<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Concerns\ConstrainsPagination;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    use ConstrainsPagination;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $this->authorize('viewAny', User::class);

        $users = User::query()
            ->visibleTo($request->user())
            ->withCount(['followers', 'followings', 'posts'])
            ->orderByDesc('created_at')
            ->paginate($this->resolvePerPage($request));

        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Use /auth/register to create a new account.',
        ], Response::HTTP_METHOD_NOT_ALLOWED);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): UserResource
    {
        $this->authorize('view', $user);

        $user->loadCount(['followers', 'followings', 'posts']);

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProfileRequest $request, User $user): UserResource
    {
        $this->authorize('update', $user);

        $data = $request->validated();

        $profileImage = $this->storeAndReplaceImage($request->file('profile_image'), $user->profile_image);
        if ($profileImage !== null) {
            $data['profile_image'] = $profileImage;
        }

        $coverImage = $this->storeAndReplaceImage($request->file('cover_image'), $user->cover_image);
        if ($coverImage !== null) {
            $data['cover_image'] = $coverImage;
        }

        $user->update($data);

        return new UserResource($user->fresh('posts'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): JsonResponse
    {
        $this->authorize('delete', $user);

        $user->tokens()->delete();
        $user->delete();

        return response()->json(
            [
                'message' => 'User removed.',
            ],
            Response::HTTP_NO_CONTENT,
        );
    }

    private function storeAndReplaceImage(?UploadedFile $incomingFile, ?string $existingPath): ?string
    {
        if ($incomingFile === null) {
            return null;
        }

        if ($existingPath !== null) {
            Storage::disk(config('filesystems.media_disk', 's3'))->delete($existingPath);
        }

        return Storage::disk(config('filesystems.media_disk', 's3'))->putFile('users', $incomingFile, 'public');
    }
}
