<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CommentController;
use App\Http\Controllers\Api\V1\CommentLikeController;
use App\Http\Controllers\Api\V1\FollowController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\PostLikeController;
use App\Http\Controllers\Api\V1\SearchController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\UserPostController;
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
        Route::get('/users/{user}/posts', [UserPostController::class, 'index'])->name('users.posts.index');
        Route::get('/users/{user}/liked-posts', [UserPostController::class, 'liked'])->name('users.posts.liked');
        Route::get('/users/{user}/followers', [FollowController::class, 'followers'])->name('users.followers');
        Route::get('/users/{user}/following', [FollowController::class, 'following'])->name('users.following');
        Route::get('/follow-requests', [FollowController::class, 'pending'])->name('follow-requests.pending');
        Route::post('/follow-requests/{follow}/accept', [FollowController::class, 'accept'])->name('follow-requests.accept');
        Route::delete('/follow-requests/{follow}', [FollowController::class, 'reject'])->name('follow-requests.reject');

        Route::post('/posts/{post}/likes', [PostLikeController::class, 'toggle'])->name('posts.likes.toggle');
        Route::post('/comments/{comment}/likes', [CommentLikeController::class, 'toggle'])->name('comments.likes.toggle');

        Route::prefix('search')->name('search.')->group(function (): void {
            Route::get('/users', [SearchController::class, 'users'])->name('users');
            Route::get('/posts', [SearchController::class, 'posts'])->name('posts');
        });

        Route::apiResource('posts', PostController::class);

        Route::get('/posts/{post}/comments', [CommentController::class, 'index'])->name('posts.comments.index');
        Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('posts.comments.store');
        Route::apiResource('comments', CommentController::class)->except(['index', 'store']);

        Route::apiResource('users', UserController::class)->only(['index', 'show', 'update', 'destroy']);
        Route::post('/users/{user}/follow', [FollowController::class, 'toggle'])->name('users.follow');
    });
});
