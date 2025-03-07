import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Image from 'next/image'

type UserCardProps = {
    user: User
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <div className={`border relative h-24 bg-center rounded-xl`}>

            <div className='absolute inset-0'>
                {user.profile_image ? (
                    <Image
                        className='w-full h-full object-cover rounded-xl'
                        src={user.cover_image}
                        width={1000}
                        height={1000}
                        alt={`${user.username}'s profile background.`} />)
                    : (
                        <div 
                        className='bg-gradient-to-br from-blue-800 via-sky-500 to-lime-300 w-full h-full flex items-center justify-center  rounded-xl' 
                        />
                    )}
            </div>

            <div className='absolute inset-0 bg-black/35 z-10 w-full h-full rounded-xl p-2 flex gap-3 items-center'>
                <Avatar className='size-10 border-white border-2 border-collapse'>
                    <AvatarImage src={user.profile_image} alt="avatar" />
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
