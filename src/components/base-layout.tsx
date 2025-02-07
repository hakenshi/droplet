import React from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar/sidebar'

export default function BaseLayout({ children, users }: { children: React.ReactNode; users?: User[] }) {
    return (
        <div className="w-screen h-screen grid grid-cols-[0.5fr,3fr,0.5fr]">
            <Navbar />
            <main className="grid p-2 mx-2 grid-cols-[1fr,auto]">
                {children}
            </main>
            {users && <Sidebar users={users} />}
        </div>
    )
}
