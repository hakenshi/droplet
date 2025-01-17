import React from 'react'
import Navbar from '@/components/navbar'
import { Input } from '@/components/ui/input';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="w-screen h-screen grid grid-cols-[0.35fr,2fr,0.35fr]">
      <Navbar />
      <main className="grid p-2 grid-cols-[1fr,auto]">
        {children}
      </main>
      <div className='border-l-2 border-zinc-400 px-2 py-5'>
          <Input className='rounded-full' placeholder='Buscar usuários' />
      </div>
    </div>
  );
}