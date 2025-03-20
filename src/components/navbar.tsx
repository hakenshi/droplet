import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { getAuthUser } from '@/utils/getAuthUser'
import { BellIcon, Bookmark, HouseIcon, MessageCircleIcon, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Logout from './logout'

import UserPostDialog from "@/components/user-profile/user-post-dialog"
import NotificationButton from './buttons/notification-button'

export default async function Navbar() {

    const { user } = await getAuthUser()

    return (
        <header className=" text-white h-screen bg-gradient p-5 shadow-xl">
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
                            href={`/profile/${user.username}`}>
                            <User />
                            Perfil
                        </Link>
                    </li>
                    <li>
                        <NotificationButton />
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
                            <AvatarImage src={user.profile_image} alt="avatar" />
                            <AvatarFallback className="bg-sky-500 text-white">
                                {user.username.toUpperCase().substring(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <span>
                            {user.username}
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-xl bg-white p-2 border-zinc-500 shadow-lg shadow-black/20 border flex flex-col">
                        <Link href={"/profile/" + user.username} className="px-4 py-2 hover:bg-zinc-200 rounded-xl w-full">
                            <span className="text-zinc-800">Perfil</span>
                        </Link>
                        <Logout user={user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </header>
    )
}
