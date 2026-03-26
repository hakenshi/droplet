<?php

namespace Database\Factories;

use App\Models\Follow;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Follow>
 */
class FollowFactory extends Factory
{
    protected $model = Follow::class;

    public function definition(): array
    {
        return [
            'follower_id' => UserFactory::new(),
            'following_id' => UserFactory::new(),
            'accepted_at' => now()->subMinutes(fake()->numberBetween(1, 20_000)),
        ];
    }

    public function pending(): static
    {
        return $this->state(fn () => ['accepted_at' => null]);
    }
}
