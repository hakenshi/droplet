<?php

namespace Database\Factories;

use App\Models\FollowRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FollowRequest>
 */
class FollowRequestFactory extends Factory
{
    protected $model = FollowRequest::class;

    public function definition(): array
    {
        return [
            'requester_id' => UserFactory::new(),
            'recipient_id' => UserFactory::new(),
        ];
    }
}
