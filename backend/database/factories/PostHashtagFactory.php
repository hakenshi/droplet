<?php

namespace Database\Factories;

use App\Models\PostHashtag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PostHashtag>
 */
class PostHashtagFactory extends Factory
{
    protected $model = PostHashtag::class;

    public function definition(): array
    {
        return [
            'post_id' => PostFactory::new(),
            'hashtag_id' => HashtagFactory::new(),
        ];
    }
}
