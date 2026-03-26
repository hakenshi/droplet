<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CommentController;
use App\Http\Controllers\Api\V1\FollowController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->name('api.v1.')->group(function (): void {
    Route::prefix('auth')->name('auth.')->group(function (): void {
        Route::post('/register', [AuthController::class, 'register'])->name('register');
        Route::post('/login', [AuthController::class, 'login'])->name('login');

        Route::middleware('auth:sanctum')->group(function (): void {
            Route::get('/me', [AuthController::class, 'me'])->name('me');
            Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
            Route::post('/logout-all', [AuthController::class, 'logoutAll'])->name('logout-all');
        });
    });

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::apiResource('posts', PostController::class);

        Route::get('/posts/{post}/comments', [CommentController::class, 'index'])->name('posts.comments.index');
        Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('posts.comments.store');
        Route::apiResource('comments', CommentController::class)->except(['index', 'store']);

        Route::apiResource('users', UserController::class)->only(['index', 'show', 'update', 'destroy']);
        Route::post('/users/{user}/follow', [FollowController::class, 'toggle'])->name('users.follow');
    });
});
