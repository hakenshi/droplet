import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Image from 'next/image'

type UserCardProps = {
    user: User
}

export default function UserCard({user}: UserCardProps) {
    return (
        <div className={`border relative h-24 bg-center rounded-xl`}>

            <div className='absolute inset-0'>
                <Image className='w-full h-full object-cover' src={"https://w.wallhaven.cc/full/7p/wallhaven-7py313.jpg"} width={200} height={200} alt={`${user.username}'s profile background.`} />
            </div>

            <div className='absolute inset-0 bg-black/35 z-10 w-full h-full rounded-xl p-2 grid grid-cols-[auto_1fr] items-center'>
            <Avatar className='w-16 h-16 border-white border-2 border-collapse'>
                <AvatarImage src={"/avatar.png"} alt="avatar" />
                <AvatarFallback className="bg-sky-500 text-white text-2xl">
                    {user.username.toUpperCase().substring(0, 2)}
                </AvatarFallback>
            </Avatar>
            <div className='text-white max-w-11/12'>
                {/* {user.name != null ? (<p className='truncate'>{user.name}</p>): ""} */}
                <p className='truncate'>@{user.username}</p>
            </div>
            </div>
        </div>
    )
}
