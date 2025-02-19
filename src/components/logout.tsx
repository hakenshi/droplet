'use client'

import { handleLogout } from '@/app/(auth)/login/actions'
import React, { useTransition } from 'react'

type LogoutProps = {
    user: User
}

export default function Logout({ user }: LogoutProps) {

    const [pending, startTransition] = useTransition()

    const logout = () => {
        startTransition(async () => {
            await handleLogout()
        })
    }

    return (
        <button onClick={logout} className="px-4 py-2 hover:bg-zinc-200 rounded-xl">
            <span className="text-zinc-800">{pending ? 'Saindo...' : `Sair de ${user.username}`}</span>
        </button>)
}
