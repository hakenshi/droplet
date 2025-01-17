import React from 'react'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar/sidebar';
import { getAuthUser } from '@/utils/getAuthUser';

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {


  const { token } = await getAuthUser()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': "application/json",
      'Accept': "application/json",
    },
  });

  const { data }: { data: User[] } = await response.json()
  const users = data
  
  return (
    <div className="w-screen h-screen grid grid-cols-[0.5fr,2fr,0.5fr]">
      <Navbar />
      <main className="grid p-2 grid-cols-[1fr,auto]">
        {children}
      </main>
      <Sidebar users={users} />
    </div>
  );
}