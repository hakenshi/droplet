<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Post;
use App\Models\Report;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Report>
 */
class ReportFactory extends Factory
{
    protected $model = Report::class;

    public function definition(): array
    {
        return [
            'reporter_id' => UserFactory::new(),
            'reportable_type' => Post::class,
            'reportable_id' => PostFactory::new(),
            'reason' => fake()->randomElement([
                'Spam',
                'Harassment',
                'Inappropriate content',
                'Misinformation',
            ]),
            'details' => fake()->optional()->sentence(),
            'status' => fake()->randomElement(['open', 'in_review', 'resolved', 'dismissed']),
        ];
    }

    public function onComment(): static
    {
        return $this->state(fn () => [
            'reportable_type' => Comment::class,
            'reportable_id' => CommentFactory::new(),
        ]);
    }

    public function pending(): static
    {
        return $this->state(fn () => ['status' => 'open']);
    }

    public function resolved(): static
    {
        return $this->state(fn () => ['status' => 'resolved']);
    }
}
