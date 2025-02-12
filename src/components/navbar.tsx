import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { HouseIcon, User, BellIcon, Bookmark, MessageCircleIcon } from 'lucide-react'
import { getAuthUser } from '@/utils/getAuthUser'
import Logout from './logout'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { revalidateTag } from 'next/cache'
import UserPostDialog from "@/components/user-profile/user-post-dialog";

export default async function Navbar() {

    const { user, token } = await getAuthUser()

    const handleLogout = async () => {
        'use server'
        const cookie = await cookies()
        const respose = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        if (respose.status === 204) {
            cookie.delete("token")
            revalidateTag('auth')
            redirect("/")
        }
    }

    return (
        <header className=" text-white h-full bg-gradient p-5 shadow-xl">
            <nav
                className="min-w-44 grid grid-rows-[0.1fr_auto_0.1fr] h-full gap-5 justify-items-center place-items-center">
                <Link href={"/"} className="flex items-center gap-2">
                    <Image src={"/logo.png"} alt="droplet logo" width={50} height={50} />
                    <p className="font-black text-2xl">DROPLET</p>
                </Link>

                <ul className="flex flex-col gap-5 w-11/12">
                    <li>
                        <Link
                            className='flex items-center gap-2  hover:bg-zinc-100/35 transition-colors px-4 py-2 rounded-full w-full'
                            href={"/"}>
                            <HouseIcon />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='flex items-center gap-2  hover:bg-zinc-100/35 transition-colors px-4 py-2 rounded-full w-full'
                            href={"/profile"}>
                            <User />
                            Perfil
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='flex items-center gap-2 hover:bg-zinc-100/35 transition-colors px-4 py-2 rounded-full w-full'
                            href={"/"}>
                            <BellIcon />
                            Notificação</Link>
                    </li>

                    <li>
                        <Link
                            className={`flex items-center gap-2 hover:bg-zinc-100/35 transition-colors px-4 py-2 rounded-full w-full`}
                            href={"/"}>
                            <Bookmark />
                            Coleções</Link>
                    </li>

                    <li>
                        <UserPostDialog user={user} >
                            <button className='flex items-center gap-2 bg-transparent hover:bg-zinc-100/35 transition-colors px-4 py-2 rounded-full w-full'>
                                <MessageCircleIcon />
                                Postar
                            </button>
                        </UserPostDialog>
                    </li>
                </ul>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="flex items-center gap-5 hover:bg-zinc-100/35 transition-colors duration-200 p-2 rounded-full w-full">
                        <Avatar>
                            <AvatarImage src={"/avatar.png"} alt="avatar" />
                            <AvatarFallback className="bg-sky-500 text-white">
                                {user.username.toUpperCase().substring(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <span>
                            {user.username}
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-xl bg-white p-2 border-zinc-500 shadow-lg shadow-black/20 border flex flex-col">
                        <Link href={"/profile"} className="px-4 py-2 hover:bg-zinc-200 rounded-xl w-full">
                            <span className="text-zinc-800">Perfil</span>
                        </Link>
                        <Logout user={user} logoutFn={handleLogout} />

                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </header>
    )
}
