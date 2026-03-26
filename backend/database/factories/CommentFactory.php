<?php

namespace Database\Factories;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Comment>
 */
class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition(): array
    {
        return [
            'post_id' => PostFactory::new(),
            'user_id' => UserFactory::new(),
            'parent_id' => null,
            'content' => fake()->sentence(),
        ];
    }

    public function reply(): static
    {
        return $this->state(fn (array $attributes) => [
            'parent_id' => CommentFactory::new(),
        ]);
    }
}
