'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import UserCard from './user-card'
import Link from 'next/link'
import Image from 'next/image'
import FormInput from '../formInput/FormInput'

type SideBarProps = {
    users: User[]
}





export default function Sidebar({ users }: SideBarProps) {

    const [search, setSearch] = useState<string>("")
    const [results, setResults] = useState<User[]>([]);
    

    useEffect(() => {
        if (search.trim() === "") {
            setResults([]);
            return;
        }

        const filtered = users.filter((user, index) => {
            return user.username.toLowerCase().includes(search.toLowerCase())
        })
        console.log(filtered)
        setResults(filtered)

    }, [search])




    return (
        <div className='flex flex-row lg:flex-col order-1 lg:order-3 w-full lg:min-w-80 h-[100px] lg:h-full px-6 lg:px-2 py-5 gap-16 items-center justify-between border-l-2 border-zinc-400'>
            <Link href={"/"} className="flex items-center gap-2 lg:hidden">
                <Image src={"/logo-gradient.png"} alt="droplet logo" width={30} height={30} />
                <p className="font-black text-2xl bg-gradient bg-clip-text text-transparent">DROPLET</p>
            </Link>

            <div className='w-4/5'>
                <FormInput
                    label='Buscar Usuarios'
                    placeholder='Busque por Usuarios'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </div>
            <div className='hidden lg:flex'>
                <p className='text-xs p-2'>Usuários Recomendados: </p>
                <div className="space-y-2">
                    {results ? results.map((user, index) => (
                        <UserCard key={index} user={user} />
                    )) : "Nenhum usuário encontrado."}
                </div>
            </div>
        </div>
    )
}
