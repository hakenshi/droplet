<?php

namespace Database\Factories;

use App\Models\PostShare;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PostShare>
 */
class PostShareFactory extends Factory
{
    protected $model = PostShare::class;

    public function definition(): array
    {
        return [
            'post_id' => PostFactory::new(),
            'user_id' => UserFactory::new(),
            'channel' => fake()->randomElement(['app', 'whatsapp', 'twitter', 'copy']),
            'target_url' => fake()->optional(0.5)->url(),
        ];
    }
}
