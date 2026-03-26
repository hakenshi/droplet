<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UserBlock;

class UserBlockPolicy
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
    public function view(User $user, UserBlock $userBlock): bool
    {
        return $user->id === $userBlock->blocker_id || $user->id === $userBlock->blocked_id;
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
    public function update(User $user, UserBlock $userBlock): bool
    {
        return $user->id === $userBlock->blocker_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, UserBlock $userBlock): bool
    {
        return $user->id === $userBlock->blocker_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, UserBlock $userBlock): bool
    {
        return $user->id === $userBlock->blocker_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, UserBlock $userBlock): bool
    {
        return $user->id === $userBlock->blocker_id;
    }
}
