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
        <header className=" text-white lg:h-screen h-[90px] flex items-center bg-gradient p-5 shadow-xl order-3 lg:order-1">
            <nav
                className="lg:min-w-44 w-full flex items-center justify-center lg:grid grid-rows-[0.1fr_auto_0.1fr] h-[100px] lg:h-full gap-5">
                <Link href={"/"} className="lg:flex items-center gap-2 hidden ">
                    <Image src={"/logo.png"} alt="droplet logo" width={50} height={50} />
                    <p className="text-2xl font-black">DROPLET</p>
                </Link>

                <ul className="flex justify-center lg:flex-col gap-2 lg:w-11/12 ">
                    <li>
                        <Link
                            className='flex items-center gap-2  hover:bg-zinc-100/35 transition-colors px-4 py-2 rounded-full w-full'
                            href={"/"}>
                            <HouseIcon />
                            <span className='hidden lg:flex'>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='flex items-center gap-2  hover:bg-zinc-100/35 transition-colors px-4 py-2 rounded-full w-full'
                            href={`/profile/${user.username}`}>
                            <User />
                            <span className='hidden lg:flex'>Perfil</span>
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
                            <span className='hidden lg:flex'>Coleções</span>
                        </Link>
                    </li>

                    <li>
                        <UserPostDialog user={user} >
                            <button className='flex items-center gap-2 bg-transparent hover:bg-zinc-100/35 transition-colors px-4 py-2 rounded-full w-full'>
                                <MessageCircleIcon />
                                <span className='hidden lg:flex'>Postar</span>
                            </button>
                        </UserPostDialog>
                    </li>
                    
                </ul>

                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="flex items-center justify-center gap-5 hover:bg-zinc-100/35 transition-colors duration-200 p-2 rounded-full lg:w-full">
                        <Avatar>
                            <AvatarImage src={user.profile_image} alt="avatar" />
                            <AvatarFallback className="bg-rose-500 text-white">
                                {user.username.toUpperCase().substring(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <span className='hidden lg:flex'>
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
