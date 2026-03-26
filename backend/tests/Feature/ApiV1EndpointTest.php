<?php

use App\Models\Comment;
use App\Models\Follow;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;

const API_V1_PREFIX = '/api/v1';

uses(RefreshDatabase::class);

test('users can register and then log in via api v1', function (): void {
    $credentials = [
        'username' => fake()->userName(),
        'name' => fake()->name(),
        'email' => fake()->safeEmail(),
        'password' => 'secret123',
        'password_confirmation' => 'secret123',
    ];

    $register = $this->postJson(API_V1_PREFIX.'/auth/register', $credentials);

    $register->assertCreated();
    $register->assertJsonStructure([
        'access_token',
        'token_type',
        'user' => [
            'id',
            'username',
            'name',
            'private_profile',
        ],
    ]);

    $login = $this->postJson(API_V1_PREFIX.'/auth/login', [
        'email' => $credentials['email'],
        'password' => $credentials['password'],
    ]);

    $login->assertOk();
    $login->assertJsonStructure(['access_token', 'token_type', 'user' => ['id', 'username']]);
});

test('users can create and retrieve post images from s3', function (): void {
    Storage::fake('s3');

    $author = User::factory()->create();
    Sanctum::actingAs($author, ['*']);

    $image = UploadedFile::fake()->image('post-cover.png');

    $response = $this->postJson(API_V1_PREFIX.'/posts', [
        'content' => 'A post with an image',
        'images' => [$image],
    ]);

    $response->assertCreated();
    $response->assertJsonStructure([
        'data' => [
            'id',
            'content',
            'images' => [['id', 'url']],
        ],
    ]);
    $this->assertSame(1, count(Storage::disk('s3')->allFiles('posts')));
    $this->assertDatabaseHas('posts', [
        'user_id' => $author->id,
        'content' => 'A post with an image',
    ]);
    $this->assertDatabaseCount('post_images', 1);

    $posts = $this->getJson(API_V1_PREFIX.'/posts');
    $posts->assertOk();
    $posts->assertJsonStructure(['data' => [['id', 'content', 'images']]]);
});

test('comments can be created and listed under their post', function (): void {
    $author = User::factory()->create();
    $post = Post::create([
        'user_id' => $author->id,
        'content' => 'Original post',
    ]);
    $commenter = User::factory()->create();

    Sanctum::actingAs($commenter, ['*']);

    $created = $this->postJson(API_V1_PREFIX."/posts/{$post->id}/comments", [
        'content' => 'Great idea',
    ]);

    $created->assertCreated();
    $created->assertJsonPath('data.post_id', (string) $post->id);
    $created->assertJsonPath('data.author.username', $commenter->username);

    $createdComment = Comment::query()->find($created->json('data.id'));
    $createdComment->refresh();

    $reply = $this->postJson(API_V1_PREFIX."/posts/{$post->id}/comments", [
        'content' => 'Replying to comment',
        'parent_id' => $createdComment->id,
    ]);

    $reply->assertCreated();
    $reply->assertJsonPath('data.parent_id', (string) $createdComment->id);

    $listing = $this->getJson(API_V1_PREFIX."/posts/{$post->id}/comments");
    $listing->assertOk();
    $listing->assertJsonCount(2, 'data');
});

test('follow toggle respects private profile state', function (): void {
    $viewer = User::factory()->create();
    $publicUser = User::factory()->create(['private_profile' => false]);
    $privateUser = User::factory()->create(['private_profile' => true]);

    Sanctum::actingAs($viewer, ['*']);

    $followPublic = $this->postJson(API_V1_PREFIX."/users/{$publicUser->id}/follow");
    $followPublic->assertCreated();
    $followPublic->assertJsonPath('status', 'following');

    $follow = Follow::query()->where('follower_id', $viewer->id)->where('following_id', $publicUser->id)->firstOrFail();
    expect($follow->accepted_at)->not->toBeNull();

    $unfollowPublic = $this->postJson(API_V1_PREFIX."/users/{$publicUser->id}/follow");
    $unfollowPublic->assertOk();
    $unfollowPublic->assertJsonPath('status', 'unfollowed');

    $followPrivate = $this->postJson(API_V1_PREFIX."/users/{$privateUser->id}/follow");
    $followPrivate->assertCreated();
    $followPrivate->assertJsonPath('status', 'requested');

    $follow = Follow::query()->where('follower_id', $viewer->id)->where('following_id', $privateUser->id)->firstOrFail();
    expect($follow->accepted_at)->toBeNull();
});

test('guests cannot modify protected v1 endpoints', function (): void {
    $post = Post::query()->create([
        'user_id' => User::factory()->create()->id,
        'content' => 'Guest check post',
    ]);

    $this->postJson(API_V1_PREFIX.'/posts', ['content' => 'Nope'])->assertUnauthorized();

    $this->postJson(API_V1_PREFIX."/posts/{$post->id}/comments", [
        'content' => 'Nope comment',
    ])->assertUnauthorized();
});

test('users cannot modify posts they do not own', function (): void {
    $owner = User::factory()->create();
    $intruder = User::factory()->create();

    $post = Post::query()->create([
        'user_id' => $owner->id,
        'content' => 'Owner only',
    ]);

    Sanctum::actingAs($intruder, ['*']);

    $this->patchJson(API_V1_PREFIX."/posts/{$post->id}", ['content' => 'Oops'])->assertForbidden();
    $this->deleteJson(API_V1_PREFIX."/posts/{$post->id}")->assertForbidden();
});

test('users cannot modify comments they do not own', function (): void {
    $commenter = User::factory()->create();
    $intruder = User::factory()->create();
    $post = Post::query()->create([
        'user_id' => $commenter->id,
        'content' => 'Comment owner post',
    ]);
    $comment = Comment::query()->create([
        'post_id' => $post->id,
        'user_id' => $commenter->id,
        'content' => 'Owner comment',
    ]);

    Sanctum::actingAs($intruder, ['*']);

    $this->putJson(API_V1_PREFIX."/comments/{$comment->id}", ['content' => 'Hacked'])->assertForbidden();
    $this->deleteJson(API_V1_PREFIX."/comments/{$comment->id}")->assertForbidden();
});

test('users list enforces minimum and maximum per_page limits', function (): void {
    $actor = User::factory()->create();
    User::factory(60)->create();

    Sanctum::actingAs($actor, ['*']);

    $belowMinimum = $this->getJson(API_V1_PREFIX.'/users?per_page=0');
    $belowMinimum->assertOk();
    $belowMinimum->assertJsonPath('meta.per_page', 1);
    $belowMinimum->assertJsonCount(1, 'data');

    $aboveMaximum = $this->getJson(API_V1_PREFIX.'/users?per_page=1000');
    $aboveMaximum->assertOk();
    $aboveMaximum->assertJsonPath('meta.per_page', 50);
    $aboveMaximum->assertJsonCount(50, 'data');
});

test('posts list enforces minimum and maximum per_page limits', function (): void {
    $owner = User::factory()->create();

    Sanctum::actingAs($owner, ['*']);

    for ($i = 0; $i < 60; $i += 1) {
        Post::query()->create([
            'user_id' => $owner->id,
            'content' => "Post {$i}",
        ]);
    }

    $belowMinimum = $this->getJson(API_V1_PREFIX.'/posts?per_page=0');
    $belowMinimum->assertOk();
    $belowMinimum->assertJsonPath('meta.per_page', 1);
    $belowMinimum->assertJsonCount(1, 'data');

    $aboveMaximum = $this->getJson(API_V1_PREFIX.'/posts?per_page=1000');
    $aboveMaximum->assertOk();
    $aboveMaximum->assertJsonPath('meta.per_page', 50);
    $aboveMaximum->assertJsonCount(50, 'data');
});

test('comments list enforces minimum and maximum per_page limits', function (): void {
    $owner = User::factory()->create();
    $post = Post::query()->create([
        'user_id' => $owner->id,
        'content' => 'Post for paginated comments',
    ]);

    for ($i = 0; $i < 60; $i += 1) {
        Comment::query()->create([
            'post_id' => $post->id,
            'user_id' => $owner->id,
            'content' => "Comment {$i}",
        ]);
    }

    Sanctum::actingAs($owner, ['*']);

    $belowMinimum = $this->getJson(API_V1_PREFIX."/posts/{$post->id}/comments?per_page=0");
    $belowMinimum->assertOk();
    $belowMinimum->assertJsonPath('meta.per_page', 1);
    $belowMinimum->assertJsonCount(1, 'data');

    $aboveMaximum = $this->getJson(API_V1_PREFIX."/posts/{$post->id}/comments?per_page=1000");
    $aboveMaximum->assertOk();
    $aboveMaximum->assertJsonPath('meta.per_page', 50);
    $aboveMaximum->assertJsonCount(50, 'data');
});

test('non numeric per_page is normalized to minimum value on list endpoints', function (): void {
    $actor = User::factory()->create();
    User::factory(30)->create();

    Sanctum::actingAs($actor, ['*']);

    for ($i = 0; $i < 30; $i += 1) {
        Post::query()->create([
            'user_id' => $actor->id,
            'content' => "Fallback post {$i}",
        ]);
    }

    $post = Post::query()->create([
        'user_id' => $actor->id,
        'content' => 'Fallback post for comments',
    ]);

    for ($i = 0; $i < 30; $i += 1) {
        Comment::query()->create([
            'post_id' => $post->id,
            'user_id' => $actor->id,
            'content' => "Fallback comment {$i}",
        ]);
    }

    $users = $this->getJson(API_V1_PREFIX.'/users?per_page=abc');
    $users->assertOk();
    $users->assertJsonPath('meta.per_page', 1);
    $users->assertJsonCount(1, 'data');

    $posts = $this->getJson(API_V1_PREFIX.'/posts?per_page=abc');
    $posts->assertOk();
    $posts->assertJsonPath('meta.per_page', 1);
    $posts->assertJsonCount(1, 'data');

    $comments = $this->getJson(API_V1_PREFIX."/posts/{$post->id}/comments?per_page=abc");
    $comments->assertOk();
    $comments->assertJsonPath('meta.per_page', 1);
    $comments->assertJsonCount(1, 'data');
});

test('guests cannot access authenticated auth endpoints', function (): void {
    $this->getJson(API_V1_PREFIX.'/auth/me')->assertUnauthorized();
    $this->postJson(API_V1_PREFIX.'/auth/logout')->assertUnauthorized();
    $this->postJson(API_V1_PREFIX.'/auth/logout-all')->assertUnauthorized();
});

test('users can fetch auth profile and revoke current and all tokens', function (): void {
    $user = User::factory()->create();

    $firstToken = $user->createToken('mobile')->plainTextToken;
    $secondToken = $user->createToken('tablet')->plainTextToken;

    $this->withToken($firstToken)
        ->getJson(API_V1_PREFIX.'/auth/me')
        ->assertOk()
        ->assertJsonPath('user.id', (string) $user->id);

    $this->withToken($firstToken)
        ->postJson(API_V1_PREFIX.'/auth/logout')
        ->assertOk()
        ->assertJsonPath('message', 'Logged out.');

    $this->assertDatabaseCount('personal_access_tokens', 1);

    $this->withToken($secondToken)
        ->postJson(API_V1_PREFIX.'/auth/logout-all')
        ->assertOk()
        ->assertJsonPath('message', 'All sessions revoked.');

    $this->assertDatabaseCount('personal_access_tokens', 0);
});

test('users can replace profile and cover media on s3 disk', function (): void {
    Storage::fake('s3');

    $user = User::factory()->create();
    $oldProfileImage = Storage::disk('s3')->putFile('users', UploadedFile::fake()->image('old-profile.png'), 'public');
    $oldCoverImage = Storage::disk('s3')->putFile('users', UploadedFile::fake()->image('old-cover.png'), 'public');

    $user->update([
        'profile_image' => $oldProfileImage,
        'cover_image' => $oldCoverImage,
    ]);

    Sanctum::actingAs($user, ['*']);

    $response = $this->patchJson(API_V1_PREFIX."/users/{$user->id}", [
        'profile_image' => UploadedFile::fake()->image('new-profile.png'),
        'cover_image' => UploadedFile::fake()->image('new-cover.png'),
    ]);

    $response->assertOk();
    $response->assertJsonPath('data.id', (string) $user->id);

    $user->refresh();

    expect($user->profile_image)->not->toBe($oldProfileImage);
    expect($user->cover_image)->not->toBe($oldCoverImage);

    Storage::disk('s3')->assertMissing($oldProfileImage);
    Storage::disk('s3')->assertMissing($oldCoverImage);
    Storage::disk('s3')->assertExists($user->profile_image);
    Storage::disk('s3')->assertExists($user->cover_image);
});

test('users can toggle post likes', function (): void {
    $author = User::factory()->create();
    $post = Post::factory()->for($author)->create();
    $liker = User::factory()->create();

    Sanctum::actingAs($liker, ['*']);

    $liked = $this->postJson(API_V1_PREFIX."/posts/{$post->id}/likes");
    $liked->assertCreated();
    $liked->assertJsonPath('status', 'liked');
    $liked->assertJsonPath('has_liked', true);
    $this->assertDatabaseHas('post_likes', [
        'post_id' => $post->id,
        'user_id' => $liker->id,
    ]);

    $unliked = $this->postJson(API_V1_PREFIX."/posts/{$post->id}/likes");
    $unliked->assertOk();
    $unliked->assertJsonPath('status', 'unliked');
    $unliked->assertJsonPath('has_liked', false);
    $this->assertDatabaseMissing('post_likes', [
        'post_id' => $post->id,
        'user_id' => $liker->id,
    ]);
});

test('users can toggle comment likes', function (): void {
    $author = User::factory()->create();
    $post = Post::factory()->for($author)->create();
    $comment = Comment::factory()->for($post)->for($author)->create();
    $liker = User::factory()->create();

    Sanctum::actingAs($liker, ['*']);

    $liked = $this->postJson(API_V1_PREFIX."/comments/{$comment->id}/likes");
    $liked->assertCreated();
    $liked->assertJsonPath('status', 'liked');
    $liked->assertJsonPath('has_liked', true);
    $this->assertDatabaseHas('comment_likes', [
        'comment_id' => $comment->id,
        'user_id' => $liker->id,
    ]);

    $unliked = $this->postJson(API_V1_PREFIX."/comments/{$comment->id}/likes");
    $unliked->assertOk();
    $unliked->assertJsonPath('status', 'unliked');
    $unliked->assertJsonPath('has_liked', false);
    $this->assertDatabaseMissing('comment_likes', [
        'comment_id' => $comment->id,
        'user_id' => $liker->id,
    ]);
});

test('users can list profile posts and liked posts', function (): void {
    $profileOwner = User::factory()->create();
    $viewer = User::factory()->create();

    $profilePost = Post::factory()->for($profileOwner)->create();
    Post::factory()->for($profileOwner)->count(2)->create();

    $likedPost = Post::factory()->create();
    $likedPost->likes()->create([
        'user_id' => $profileOwner->id,
    ]);

    Sanctum::actingAs($viewer, ['*']);

    $posts = $this->getJson(API_V1_PREFIX."/users/{$profileOwner->id}/posts");
    $posts->assertOk();
    $posts->assertJsonCount(3, 'data');

    $likedPosts = $this->getJson(API_V1_PREFIX."/users/{$profileOwner->id}/liked-posts");
    $likedPosts->assertOk();
    $likedPosts->assertJsonCount(1, 'data');
    $likedPosts->assertJsonPath('data.0.id', (string) $likedPost->id);
    $likedPosts->assertJsonMissingPath('data.1.id');

    $posts->assertJsonFragment([
        'id' => (string) $profilePost->id,
    ]);
});

test('users can list accepted followers and following connections', function (): void {
    $profileOwner = User::factory()->create();
    $viewer = User::factory()->create();

    $followerAccepted = User::factory()->create();
    $followerPending = User::factory()->create();
    $followingAccepted = User::factory()->create();

    Follow::factory()->create([
        'follower_id' => $followerAccepted->id,
        'following_id' => $profileOwner->id,
        'accepted_at' => now(),
    ]);

    Follow::factory()->pending()->create([
        'follower_id' => $followerPending->id,
        'following_id' => $profileOwner->id,
    ]);

    Follow::factory()->create([
        'follower_id' => $profileOwner->id,
        'following_id' => $followingAccepted->id,
        'accepted_at' => now(),
    ]);

    Sanctum::actingAs($viewer, ['*']);

    $followers = $this->getJson(API_V1_PREFIX."/users/{$profileOwner->id}/followers");
    $followers->assertOk();
    $followers->assertJsonCount(1, 'data');
    $followers->assertJsonPath('data.0.id', (string) $followerAccepted->id);

    $following = $this->getJson(API_V1_PREFIX."/users/{$profileOwner->id}/following");
    $following->assertOk();
    $following->assertJsonCount(1, 'data');
    $following->assertJsonPath('data.0.id', (string) $followingAccepted->id);
});

test('users can search users and posts', function (): void {
    $viewer = User::factory()->create();
    $matchedUser = User::factory()->create([
        'username' => 'searchable_username',
    ]);

    Post::factory()->for($matchedUser)->create([
        'content' => 'rainwater collection tips',
    ]);

    Sanctum::actingAs($viewer, ['*']);

    $users = $this->getJson(API_V1_PREFIX.'/search/users?query=searchable');
    $users->assertOk();
    $users->assertJsonPath('data.0.id', (string) $matchedUser->id);

    $posts = $this->getJson(API_V1_PREFIX.'/search/posts?query=rainwater');
    $posts->assertOk();
    $posts->assertJsonPath('data.0.author.id', (string) $matchedUser->id);

    $invalid = $this->getJson(API_V1_PREFIX.'/search/users');
    $invalid->assertUnprocessable();
    $invalid->assertJsonValidationErrors(['query']);
});
