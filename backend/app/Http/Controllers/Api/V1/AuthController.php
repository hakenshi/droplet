<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    private const string DEFAULT_DEVICE_NAME = 'api-token';

    private const string TOKEN_TYPE = 'Bearer';

    /**
     * Register a new user and return a token.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create($request->validated());

        $token = $this->createAuthToken($user, $request->input('device_name', self::DEFAULT_DEVICE_NAME));

        return response()->json([
            'access_token' => $token,
            'token_type' => self::TOKEN_TYPE,
            'user' => new UserResource($user),
        ], Response::HTTP_CREATED);
    }

    /**
     * Authenticate a user and return a token.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::query()
            ->where('email', $request->string('email')->toString())
            ->first();

        if ($user === null || ! Hash::check($request->string('password')->toString(), $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $this->createAuthToken($user, $request->input('device_name', self::DEFAULT_DEVICE_NAME));

        return response()->json([
            'access_token' => $token,
            'token_type' => self::TOKEN_TYPE,
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Revoke the currently authenticated token.
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Logged out.',
        ]);
    }

    /**
     * Revoke all tokens for the authenticated user.
     */
    public function logoutAll(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'All sessions revoked.',
        ]);
    }

    /**
     * Return the current authenticated user.
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => new UserResource($request->user()),
        ]);
    }

    private function createAuthToken(User $user, string $deviceName): string
    {
        return $user->createToken($deviceName)->plainTextToken;
    }
}
