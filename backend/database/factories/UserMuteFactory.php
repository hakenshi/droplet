<?php

namespace Database\Factories;

use App\Models\UserMute;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UserMute>
 */
class UserMuteFactory extends Factory
{
    protected $model = UserMute::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'muter_id' => UserFactory::new(),
            'muted_user_id' => UserFactory::new(),
        ];
    }
}
