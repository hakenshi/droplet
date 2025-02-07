import UserEditProfileDialog from '@/components/user-profile/user-edit-profile-dialog'
import UserProfileTabs from '@/components/user-profile/user-profile-tabs'
import { getAuthUser } from '@/utils/getAuthUser'
import Image from 'next/image'
import React from 'react'

export default async function ProfilePage() {

    const { user } = await getAuthUser()
    

    return (
        <div className='grid grid-rows-[0.65fr,0.65,1fr] overflow-y-scroll px-10'>
            <div className='flex justify-center w-full h-96'>
                <Image className='rounded-md w-screen' width={1200} height={300} src={'https://w.wallhaven.cc/full/57/wallhaven-57lkm9.jpg'} alt={`${user.name}'s background image`} />

            </div>
            <div className='h-fit'>
                <div className='relative flex flex-col justify-center items-start -mt-32'>
                    <div className="flex w-full justify-between h-fit px-5 pb-3 pt-5 items-center space-x-4"                >
                        <div className='flex items-center'>
                            <Image className='rounded-full border-4 border-white shadow-md' width={200} height={200} src={"https://pbs.twimg.com/profile_images/1865591206048137216/VQeLKnUq_400x400.jpg"} alt={`${user.name}'s background image`} />
                            <ul className='mx-3 mt-28 flex flex-col'>
                                <li className='text-zinc-800'>
                                   {user.name ?? user.username}
                                </li>
                                <li className='text-zinc-500 text-sm'>
                                    @{user.username}
                                </li>
                                <li className='text-zinc-500 text-sm'>
                                    18/08/2003
                                </li>
                                <li className='text-zinc-500 text-sm'>
                                    Entrou em agosto de 2024
                                </li>
                            </ul>
                        </div>
                        <UserEditProfileDialog user={user} />
                    </div>
                </div>
                <UserProfileTabs user={user} />
            </div>
        </div>
    )
}
