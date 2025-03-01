<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('users', [UserController::class, 'index']);

    Route::prefix('user')->group(function () {
        Route::get('{user}', [UserController::class, 'show']);
        Route::patch('{user}', [UserController::class, 'update']);
    });

    Route::prefix('posts')->group(function () {
        Route::get('index', [PostController::class, 'index']);
        Route::get('{username}', [PostController::class, 'showUserPosts']);
        Route::get('liked/{username}', [PostController::class, 'showUserLikedPosts']);
        Route::post('store', [PostController::class, 'store']);
        Route::post('like', [PostController::class, 'storeLike']);
        Route::prefix('comment')->group(function () {
            Route::get('show/{comment}', [CommentController::class, 'show']);
            Route::post('/', [CommentController::class, 'store']);
            Route::post('reply/{comment}', [CommentController::class, 'storeReply']);
            Route::post('like/{comment}', [CommentController::class, 'storeLike']);
            Route::patch('{comment}', [CommentController::class, 'update']);
            Route::delete('{comment}', [CommentController::class, 'destroy']);
        });
        Route::get('{post}/comment', [CommentController::class, 'index']);
        Route::get('show/{post}', [PostController::class, 'show']);
        Route::patch('{post}', [PostController::class, 'update']);
        Route::delete('{post}', [PostController::class, 'destroy']);
    });

});
