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
        <div onClick={() => router.push(`/profile/${user.username}`)} className="px-3 cursor-pointer border border-gray-300 rounded-xl hover:opacity-60 ">
      
            <div className='w-full h-full rounded-xl p-2 flex gap-3 items-center z-10'>
                <Avatar className=''>
                    <AvatarImage src={user.profile_image} alt="avatar" />
                    <AvatarFallback className="bg-sky-500 text-white text-2xl">
                        {user.username.toUpperCase().substring(0, 2)}
                    </AvatarFallback>
                </Avatar>
                <div className='max-w-11/12 z-10 text-zinc-100'>
                    {user.name != null ? (<p className='truncate'>{user.name}</p>) : ""}
                    <p className='truncate text-gray-500'>@{user.username}</p>
                </div>
            </div>
        </div>
    )
}
