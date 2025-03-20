'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import UnfollowButton from '@/components/buttons/unfollow-button'
import { useReverb } from '@/lib/hooks/useReverb'

interface FollowCardProps {
    followData: User
    canUnfollow?: boolean
    currentTab: 'followers' | 'following'
}

interface FollowProps {
    user: User
    followers: FollowResponse['followers']
    following: FollowResponse['following']
    canUnfollow?: boolean
}

function FollowCard({ followData, currentTab, canUnfollow }: FollowCardProps) {

    return (
        <Card>
            <CardContent className='p-5 flex justify-between items-center'>
                <Link key={followData.id} href={`/profile/${followData.username}`}>
                    <div className='flex items-center gap-2'>
                        <Avatar className='size-12 border-2 border-white'>
                            <AvatarImage src={followData.profile_image} alt="avatar" />
                            <AvatarFallback className="bg-lime-500 text-white">
                                {followData.username.toUpperCase().substring(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className='text-zinc-700 text-lg font-medium'>{followData.name && followData.surname ? `${followData.name} ${followData.surname}` : followData.username}</p>
                            <p className='text-lime-500 text-sm'>@{followData.username}</p>
                        </div>
                    </div>
                </Link>
                <div>
                    {currentTab == 'following' && canUnfollow ? <UnfollowButton user={followData} /> : ""}
                </div>
            </CardContent>
        </Card>
    )
}

export default function Follow({ user, followers, following, canUnfollow }: FollowProps) {

    const [tab, setTab] = useState<'followers' | "following">('followers')

    const { listen, channel } = useReverb('test.event')

    const testSocket = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-notification`)
        const data = await response.json()
        console.log(data)
    }

    useEffect(() => {
        // console.log(channel)

        console.log(listen('test-notification', (data: any) => {
            console.log(data.message)
        }))
        
        listen('test-notification', (data: any) => {
            console.log(data.message)
        })
    }, [listen])

    return (
        <div className='grid grid-rows-[0.1fr_auto] gap-4 border border-collapse border-zinc-300 rounded-md p-5'>
            <div className='flex items-start justify-between'>
                <Link className='flex items-center gap-2' href={`/profile/${user.username}`}>
                    <Avatar className='size-14 border-2 border-white'>
                        <AvatarImage src={user.profile_image} alt="avatar" />
                        <AvatarFallback className="bg-lime-500 text-white text-3xl">
                            {user.username.toUpperCase().substring(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='text-zinc-700 text-lg font-medium'>{user.name && user.surname ? `${user.name} ${user.surname}` : user.username}</p>
                        <p className='text-lime-500 text-sm'>@{user.username}</p>
                    </div>
                </Link>
                <div className='space-x-5'>
                    <Button onClick={() => setTab('followers')}>Seguidores</Button>
                    <Button onClick={() => setTab('following')}>Seguindo</Button>
                    <Button onClick={testSocket}>Test Socket</Button>
                </div>
            </div>
            <div className='space-y-5'>
                <p className='capitalize font-bold text-zinc-800 text-2xl p-2 mb-5'>{tab === "followers" ? "Seguidores" : "Seguindo"}</p>
                {tab === 'following' && followers.user_followers.map(follower => (
                    <FollowCard key={follower.id} followData={follower} currentTab={tab} canUnfollow={canUnfollow} />
                ))}
                {tab === 'followers' && following.following_users.map(following => (
                    <FollowCard key={following.id} followData={following} currentTab={tab} />
                ))}
            </div>
        </div>

    )
}
