<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\PostDonation;
use App\Models\User;

class PostDonationPolicy
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
    public function view(User $user, PostDonation $postDonation): bool
    {
        return $user->id === $postDonation->user_id || $user->id === $postDonation->post->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, ?Post $post = null): bool
    {
        return $post === null || $user->id !== $post->user_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, PostDonation $postDonation): bool
    {
        return $user->id === $postDonation->post->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, PostDonation $postDonation): bool
    {
        return $user->id === $postDonation->user_id || $user->id === $postDonation->post->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, PostDonation $postDonation): bool
    {
        return $user->id === $postDonation->user_id || $user->id === $postDonation->post->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, PostDonation $postDonation): bool
    {
        return $user->id === $postDonation->user_id || $user->id === $postDonation->post->user_id;
    }
}
