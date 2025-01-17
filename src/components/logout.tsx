
import React from 'react'

type LogoutProps = {
    user: User
    logoutFn: VoidFunction
}

export default function Logout({user, logoutFn}: LogoutProps) {
    return (
        <button onClick={logoutFn} className="px-4 py-2 hover:bg-zinc-200 rounded-xl">
            <span className="text-zinc-800">Sair de <strong>{user.username}</strong></span>
        </button>)
}
