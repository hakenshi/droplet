<?php

namespace Database\Factories;

use App\Models\PostSave;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PostSave>
 */
class PostSaveFactory extends Factory
{
    protected $model = PostSave::class;

    public function definition(): array
    {
        return [
            'post_id' => PostFactory::new(),
            'user_id' => UserFactory::new(),
        ];
    }
}
