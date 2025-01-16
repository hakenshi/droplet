import React from 'react'
import Navbar from '@/components/navbar'

export default async function HomeLayout({children}: {children: React.ReactNode}) {

    return (
      <div className="w-screen h-screen grid grid-cols-[auto,1fr]">
        <Navbar />
        <main className="grid grid-cols-[1fr,auto]">
          <div className="p-2">
            {children}
          </div>
          <div className="w-44 border-l-2 border-zinc-400 p-2">
            <div>
              searchbar
            </div>
          </div>
        </main>
      </div>
    );
}