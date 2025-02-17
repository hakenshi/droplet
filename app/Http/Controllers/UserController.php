<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return UserResource::collection(User::all());
    }

    /**
     * Display the specified resource.
     */

    public function show(string $username): UserResource
    {
        $user = User::where('username', $username)->firstOrFail();

        return new UserResource($user);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(User $user, Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'nullable|string|max:255',
                'surname' => 'nullable|string|max:255',
                'bio' => 'nullable|string|max:255',
                'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif',
                'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            ]);

            if ($request->hasFile('icon') && $request->file('icon')->isValid()) {
                $iconPath = User::updateProfileImage($request, "icon", "icons");
            }

            if ($request->hasFile('cover') && $request->file('cover')->isValid()) {
                $coverPath = User::updateProfileImage($request, "cover", "covers");
            }

            $user->update([
                'name' => $data['name'] ?? $user->name,
                'surname' => $data['surname'] ?? $user->surname,
                'bio' => $data['bio'] ?? $user->bio,
                'profile_image' => $iconPath ?? $user->profile_image,
                'cover_image' => $coverPath ?? $user->cover_image,
            ]);

            return new UserResource($user);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Ocorreu um erro ao atualizar o usuário.',
                'message' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
