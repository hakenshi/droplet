import IconButton from '@/components/icon-button'
import { Button } from '@/components/ui/button'
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import UserProfileCover from '@/components/user-profile/user-profile-cover'
import UserProfileTabs from '@/components/user-profile/user-profile-tabs'
import { getAuthUser } from '@/utils/getAuthUser'
import { User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default async function ProfilePage() {

    const { user } = await getAuthUser()

    return (
        <div className='grid grid-rows-[0.65fr,1fr] overflow-y-scroll'>
            <div className='flex justify-center w-full'>
                <Image className='w-screen h-[26rem] rounded-md' width={1920} height={1080} src={'https://w.wallhaven.cc/full/57/wallhaven-57lkm9.jpg'} alt={`${user.name}'s background image`} />
            </div>
            <div className='h-fit'>
                <div className='relative flex flex-col justify-center items-start -mt-32'>
                    <div className="flex w-full justify-between h-fit px-5 pb-3 pt-5 items-center space-x-4"                >
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
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className='rounded-full bg-sky-500 hover:bg-sky-600 transition-colors duration-200 shadow-md border-2 border-zinc-50'>
                                    Editar Perfil
                                </Button>
                            </DialogTrigger>
                            <DialogContent className='max-w-2xl w-full'>
                                <DialogHeader>
                                    <DialogTitle className='flex items-center'>
                                        Editar Perfil
                                    </DialogTitle>
                                </DialogHeader>
                                <form action="" className='max-h-[40rem] h-full grid grid-rows-[auto_1fr]'>
                                    <div className='mb-5'>
                                        <UserProfileCover user={user} />
                                        <div className='relative w-fit flex flex-col justify-center items-start ml-3 -mt-24 z-30'>
                                            <Image className='rounded-full border-4 border-white shadow-md' width={125} height={125} src={"https://pbs.twimg.com/profile_images/1865591206048137216/VQeLKnUq_400x400.jpg"} alt={`${user.name}'s background image`} />
                                        </div>
                                    </div>
                                    <div className='space-y-2 overflow-y-scroll'>
                                        <IconButton Icon={User} placeholder='Nome' />
                                        <IconButton Icon={User} placeholder='Sobrenome' />
                                        <IconButton Icon={User} placeholder='Bio' />
                                    </div>
                                    <DialogFooter className='px-2 pt-5'>
                                        <Button>Salvar</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <UserProfileTabs />
            </div>
        </div>
    )
}
