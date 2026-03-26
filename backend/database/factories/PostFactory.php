<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        $donationGoal = fake()->optional(0.4)->randomFloat(2, 5, 2000);

        return [
            'user_id' => UserFactory::new(),
            'content' => fake()->paragraph(),
            'donation_goal' => $donationGoal,
        ];
    }
}
