<?php

namespace Database\Factories;

use App\Models\Mention;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Mention>
 */
class MentionFactory extends Factory
{
    protected $model = Mention::class;

    public function definition(): array
    {
        $startPosition = fake()->numberBetween(0, 150);

        return [
            'post_id' => PostFactory::new(),
            'comment_id' => null,
            'mentioned_by_user_id' => UserFactory::new(),
            'mentioned_user_id' => UserFactory::new(),
            'start_position' => $startPosition,
            'end_position' => $startPosition + fake()->numberBetween(1, 30),
        ];
    }

    public function onComment(): static
    {
        return $this->state(fn () => [
            'post_id' => null,
            'comment_id' => CommentFactory::new(),
        ]);
    }
}
