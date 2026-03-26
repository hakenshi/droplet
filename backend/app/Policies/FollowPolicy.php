<?php

namespace App\Policies;

use App\Models\Follow;
use App\Models\User;

class FollowPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Follow $follow): bool
    {
        return $user->id === $follow->follower_id || $user->id === $follow->following_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Follow $follow): bool
    {
        return $user->id === $follow->following_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Follow $follow): bool
    {
        return $user->id === $follow->follower_id || $user->id === $follow->following_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Follow $follow): bool
    {
        return $user->id === $follow->follower_id || $user->id === $follow->following_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Follow $follow): bool
    {
        return $user->id === $follow->follower_id || $user->id === $follow->following_id;
    }
}
