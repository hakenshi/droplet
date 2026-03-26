<?php

namespace Database\Factories;

use App\Models\NotificationPreference;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<NotificationPreference>
 */
class NotificationPreferenceFactory extends Factory
{
    protected $model = NotificationPreference::class;

    public function definition(): array
    {
        return [
            'user_id' => UserFactory::new(),
            'all' => true,
            'follows' => fake()->boolean(),
            'likes' => fake()->boolean(),
            'comments' => fake()->boolean(),
            'mentions' => fake()->boolean(),
            'donations' => fake()->boolean(),
        ];
    }

    public function disabled(): static
    {
        return $this->state(fn () => [
            'all' => false,
            'follows' => false,
            'likes' => false,
            'comments' => false,
            'mentions' => false,
            'donations' => false,
        ]);
    }
}
