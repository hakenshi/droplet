'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type UserCardProps = {
    user: User
}

export default function UserCard({ user }: UserCardProps) {

    const router = useRouter()

    return (
        <div onClick={() => router.push(`/profile/${user.username}`)} className={`px-3 relative cursor-pointer`}>
            <Image src={user.cover_image} alt="avatar" fill className='absolute inset-0 border-2 rounded-xl' />
            <div className='transition-colors hover:bg-black/40 bg-black/30 absolute inset-0 rounded-xl'></div>
            <div className='w-full h-full rounded-xl p-2 flex gap-3 items-center z-10'>
                <Avatar className=''>
                    <AvatarImage src={user.profile_image} alt="avatar" />
                    <AvatarFallback className="bg-sky-500 text-white text-2xl">
                        {user.username.toUpperCase().substring(0, 2)}
                    </AvatarFallback>
                </Avatar>
                <div className='max-w-11/12 z-10 text-zinc-100'>
                    {user.name != null ? (<p className='truncate'>{user.name}</p>) : ""}
                    <p className='truncate'>@{user.username}</p>
                </div>
            </div>
        </div>
    )
}
