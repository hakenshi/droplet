import React from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar/sidebar'
import { getUsers } from '@/utils/user';
import { getAuthUser } from '@/utils/getAuthUser';
import { ReverbProvider } from '@/lib/hooks/useReverb';

export default async function BaseLayout({ children }: { children: React.ReactNode }) {
    const { token } = await getAuthUser()
    const {users} = await getUsers(token)
    
    return (
        <ReverbProvider>
            <div className="w-screen max-h-screen h-screen overflow-clip grid grid-cols-[0.5fr,3fr,0.5fr]">
                <Navbar />
                <main className="grid p-2 mx-2 grid-cols-[1fr,auto]">
                    {children}
                </main>
                {users && <Sidebar users={users} />}
            </div>
        </ReverbProvider>
    )
}
