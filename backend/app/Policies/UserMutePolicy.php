<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UserMute;

class UserMutePolicy
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
    public function view(User $user, UserMute $userMute): bool
    {
        return $user->id === $userMute->muter_id || $user->id === $userMute->muted_user_id;
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
    public function update(User $user, UserMute $userMute): bool
    {
        return $user->id === $userMute->muter_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, UserMute $userMute): bool
    {
        return $user->id === $userMute->muter_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, UserMute $userMute): bool
    {
        return $user->id === $userMute->muter_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, UserMute $userMute): bool
    {
        return $user->id === $userMute->muter_id;
    }
}
