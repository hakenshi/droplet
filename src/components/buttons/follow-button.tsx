'use client'

import { followUser } from '@/app/(user)/profile/actions/actions'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useReverb } from '@/lib/hooks/useReverb'

export default function FollowButton({ user }: { user: User }) {

    const [isFollowing, setIsFollowing] = useState(false)
    // const {  } = useReverb()

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
