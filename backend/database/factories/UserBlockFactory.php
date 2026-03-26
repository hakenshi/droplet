<?php

namespace Database\Factories;

use App\Models\UserBlock;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UserBlock>
 */
class UserBlockFactory extends Factory
{
    protected $model = UserBlock::class;

    public function definition(): array
    {
        return [
            'blocker_id' => UserFactory::new(),
            'blocked_id' => UserFactory::new(),
        ];
    }
}
