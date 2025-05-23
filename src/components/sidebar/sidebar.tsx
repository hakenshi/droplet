import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import UserCard from './user-card'
import Link from 'next/link'
import Image from 'next/image'

type SideBarProps = {
    users: User[]
}

export default function Sidebar({ users }: SideBarProps) {

    return (
        <div className='border-l-2 lg:h-full h-[100px] w-full lg:w-auto border-zinc-400
          px-4 py-5 flex lg:flex-col gap-10 flex-row items-center justify-between order-1 lg:order-3  '>
            <Link href={"/"} className="flex items-center gap-2 lg:hidden ">
                <Image src={"/logo-gradient.png"} alt="droplet logo" width={30} height={30} />
                <p className="font-black text-2xl bg-gradient bg-clip-text text-transparent">DROPLET</p>
            </Link>
            <div>
                <Label className='p-2 text-zinc-700 text-xs'>Insira algo para buscar</Label>
                <Input className='rounded-full w-full lg:w-auto' placeholder='Buscar usuários' />
            </div>
            <div className='hidden lg:flex'>
                <p className='text-xs p-2'>Usuários Recomendados: </p>
                <div className="space-y-2">
                    {users ? users.map((user, index) => (
                        <UserCard key={index} user={user} />
                    )) : "Nenhum usuário encontrado."}
                </div>
            </div>
        </div>
    )
}
