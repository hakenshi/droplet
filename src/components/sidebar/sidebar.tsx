import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import UserCard from './user-card'

type SideBarProps = {
    users: User[]
}

export default function Sidebar({users}:SideBarProps) {

    return (
        <div className='border-l-2 h-full w-full border-zinc-400 px-2 py-5'>
            <div>
                <Label className='p-2 text-zinc-700 text-xs'>Insira algo para buscar</Label>
                <Input className='rounded-full' placeholder='Buscar usuários' />
            </div>
            <div>
                <p className='text-xs p-2'>Usuários Recomendados: </p>
                <div className="space-y-2">
                    { users ? users.map((user, index) => (
                        <UserCard key={index} user={user} />
                    )) : "Nenhum usuário encontrado."}
                </div>
            </div>
        </div>
    )
}
