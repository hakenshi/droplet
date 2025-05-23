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
        <div className='flex flex-row lg:flex-col order-1 lg:order-3 w-full lg:w-auto h-[100px] lg:h-full px-20 lg:px-2 py-5 gap-10 items-center justify-between border-l-2 border-zinc-400'>
            <Link href={"/"} className="flex items-center gap-2 lg:hidden">
                <Image src={"/logo-gradient.png"} alt="droplet logo" width={30} height={30} />
                <p className="font-black text-2xl bg-gradient bg-clip-text text-transparent">DROPLET</p>
            </Link>
            <div>
                <Label className='p-2 text-xs text-zinc-700'>Insira algo para buscar</Label>
                <Input className='w-full lg:w-auto rounded-full' placeholder='Buscar usuários' />
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
