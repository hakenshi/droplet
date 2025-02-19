import UserEditProfileDialog from '@/components/user-profile/user-edit-profile-dialog'
import UserProfileTabs from '@/components/user-profile/user-profile-tabs'
import Image from 'next/image'
import React from 'react'
import { getUserLikedPosts, getUserPosts, getUserProfile } from '../actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function ProfilePage({ params }: { params: { username: string } }) {

    const { username } = await params
    const user = await getUserProfile(username)
    const { posts } = await getUserPosts(username)
    const { likedPosts } = await getUserLikedPosts(user.username)

    return (
        <div className='grid grid-rows-[0.65fr,auto,1fr] max-h-screen overflow-y-scroll px-5 no-scroll-bar'>
            <div className='flex justify-center h-96'>
                {user.cover_image ? (
                    <Image
                    className='rounded-md object-cover'
                    width={1536}
                    height={384}
                    src={user.cover_image}
                    alt={`${user.name}'s background image`}
                />
                ): 
                <div className='bg-gradient-to-br from-blue-800 via-sky-500 to-lime-300 w-full h-full rounded-md flex items-center justify-center'>
                </div>
                }
            </div>
            <div className='h-fit'>
                <div className='relative flex flex-col justify-center items-start -mt-32'>
                    <div className="flex w-full justify-between h-fit px-5 pb-3 pt-5 items-center space-x-4"                >
                        <div className='flex items-center'>
                            <Avatar className='size-28 border-2 border-white'>
                                <AvatarImage src={user.profile_image} alt="avatar" />
                                <AvatarFallback className="bg-lime-500 text-white text-3xl">
                                    {user.username.toUpperCase().substring(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <ul className='mx-3 mt-28 flex flex-col'>
                                <li className='text-zinc-800'>
                                    {user.name && user.surname ? `${user.name} ${user.surname}` : user.username}
                                </li>
                                <li className='text-zinc-500 text-sm'>
                                    @{user.username}
                                </li>
                                <li className='text-zinc-500 text-sm'>
                                    18/08/2003
                                </li>
                                <li className='text-zinc-500 text-sm'>
                                    Entrou em {user.created_at && Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(user.created_at))}
                                </li>
                            </ul>
                        </div>
                        <UserEditProfileDialog user={user} />
                    </div>
                </div>
                <UserProfileTabs user={user} posts={posts as unknown as PostSuccessResponse[]} likedPosts={likedPosts} />
            </div>
        </div>
    )
}
