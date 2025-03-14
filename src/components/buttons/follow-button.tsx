'use client'

import { followUser } from '@/app/(user)/profile/actions/actions'
import { useState } from 'react'
import { Button } from '../ui/button'

export default function FollowButton({ user }: { user: User }) {

    const [isFollowing, setIsFollowing] = useState(false)

    const follow = async () => {
        setIsFollowing(true)
        await followUser(user.username, user.id)
        setIsFollowing(false)
    }

    return (
        <Button
            onClick={follow}
            disabled={isFollowing}
            variant={'defaultRounded'}
        >
            Seguir
        </Button>
    )
}
