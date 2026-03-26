<?php

namespace Database\Factories;

use App\Models\PostView;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PostView>
 */
class PostViewFactory extends Factory
{
    protected $model = PostView::class;

    public function definition(): array
    {
        return [
            'post_id' => PostFactory::new(),
            'user_id' => UserFactory::new(),
            'ip_address' => fake()->optional(0.35)->ipv4(),
            'user_agent' => fake()->optional(0.85)->userAgent(),
        ];
    }
}
