<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CommentController;
use App\Http\Controllers\Api\V1\CommentLikeController;
use App\Http\Controllers\Api\V1\FollowController;
use App\Http\Controllers\Api\V1\HashtagController;
use App\Http\Controllers\Api\V1\MentionController;
use App\Http\Controllers\Api\V1\NotificationPreferenceController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\PostLikeController;
use App\Http\Controllers\Api\V1\PostSaveController;
use App\Http\Controllers\Api\V1\PostShareController;
use App\Http\Controllers\Api\V1\ReportController;
use App\Http\Controllers\Api\V1\SearchController;
use App\Http\Controllers\Api\V1\UserBlockController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\UserMuteController;
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
        Route::post('/follow-requests/{followRequest}/accept', [FollowController::class, 'accept'])->name('follow-requests.accept');
        Route::delete('/follow-requests/{followRequest}', [FollowController::class, 'reject'])->name('follow-requests.reject');
        Route::delete('/follow-requests/{followRequest}/cancel', [FollowController::class, 'cancel'])->name('follow-requests.cancel');

        Route::post('/posts/{post}/likes', [PostLikeController::class, 'toggle'])->name('posts.likes.toggle');
        Route::post('/comments/{comment}/likes', [CommentLikeController::class, 'toggle'])->name('comments.likes.toggle');
        Route::post('/posts/{post}/reports', [ReportController::class, 'storePost'])->name('posts.reports.store');
        Route::post('/comments/{comment}/reports', [ReportController::class, 'storeComment'])->name('comments.reports.store');
        Route::post('/mentions', [MentionController::class, 'store'])->name('mentions.store');
        Route::get('/mentions', [MentionController::class, 'index'])->name('mentions.index');
        Route::get('/mentions/{mention}', [MentionController::class, 'show'])->name('mentions.show');
        Route::delete('/mentions/{mention}', [MentionController::class, 'destroy'])->name('mentions.destroy');

        Route::post('/posts/{post}/saves', [PostSaveController::class, 'toggle'])->name('posts.saves.toggle');
        Route::delete('/posts/{post}/saves', [PostSaveController::class, 'destroy'])->name('posts.saves.destroy');
        Route::get('/users/{user}/saves', [PostSaveController::class, 'index'])->name('users.saves.index');

        Route::post('/posts/{post}/shares', [PostShareController::class, 'store'])->name('posts.shares.store');
        Route::delete('/post-shares/{postShare}', [PostShareController::class, 'destroy'])->name('post-shares.destroy');
        Route::get('/users/{user}/shares', [PostShareController::class, 'index'])->name('users.shares.index');

        Route::apiResource('hashtags', HashtagController::class)->only(['index', 'show', 'store']);

        Route::get('/users/{user}/notification-preferences', [NotificationPreferenceController::class, 'show'])->name('users.notification-preferences.show');
        Route::post('/users/{user}/notification-preferences', [NotificationPreferenceController::class, 'store'])->name('users.notification-preferences.store');
        Route::match(['put', 'patch'], '/users/{user}/notification-preferences', [NotificationPreferenceController::class, 'update'])->name('users.notification-preferences.update');

        Route::get('/users/blocked', [UserBlockController::class, 'index'])->name('users.blocked.index');
        Route::post('/users/{user}/block', [UserBlockController::class, 'toggle'])->name('users.block.toggle');
        Route::get('/users/muted', [UserMuteController::class, 'index'])->name('users.muted.index');
        Route::post('/users/{user}/mute', [UserMuteController::class, 'toggle'])->name('users.mute.toggle');

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
