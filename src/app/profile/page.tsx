import { Button } from '@/components/ui/button'
import UserProfileTabs from '../../components/user-profile-tabs'
import { getAuthUser } from '@/utils/getAuthUser'
import Image from 'next/image'
import React from 'react'

export default async function ProfilePage() {

    const { user } = await getAuthUser()

    console.log(user?.created_at)

    return (
        <div className='grid grid-rows-[0.65fr,1fr,auto] overflow-y-scroll'>
            <div className='flex justify-center w-full shadow-inner shadow-black'>
                <Image className='object-cover w-screen h-[26rem]' width={2000} height={0} src={'https://w.wallhaven.cc/full/57/wallhaven-57lkm9.jpg'} alt={`${user.name}'s background image`} />
            </div>
            <div className='h-fit'>
                <div className='relative flex flex-col justify-center items-start -mt-32'>
                    <div className="flex w-full justify-between h-fit p-5 items-center space-x-4"                >
                       <div className='flex items-center'>
                       <Image className='rounded-full border-4 border-white shadow-md' width={200} height={200} src={"https://pbs.twimg.com/profile_images/1865591206048137216/VQeLKnUq_400x400.jpg"} alt={`${user.name}'s background image`} />
                        <ul className='mx-3 mt-28 flex flex-col'>
                            <li className='text-zinc-800'>
                                Felipe Kafka Dias
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
                        <Button className='rounded-full bg-gradient hover:scale-105 transition-transform duration-200 shadow-md border-2 border-zinc-50'>Editar Perfil</Button>
                    </div>
                </div>
                <UserProfileTabs />
            </div>
        </div>
    )
}
