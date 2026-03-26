<?php

namespace App\Policies;

use App\Models\Mention;
use App\Models\User;

class MentionPolicy
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
    public function view(User $user, Mention $mention): bool
    {
        return $user->id === $mention->mentioned_by_user_id || $user->id === $mention->mentioned_user_id;
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
    public function update(User $user, Mention $mention): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Mention $mention): bool
    {
        return $user->id === $mention->mentioned_by_user_id || $user->id === $mention->mentioned_user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Mention $mention): bool
    {
        return $user->id === $mention->mentioned_by_user_id || $user->id === $mention->mentioned_user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Mention $mention): bool
    {
        return $user->id === $mention->mentioned_by_user_id || $user->id === $mention->mentioned_user_id;
    }
}
