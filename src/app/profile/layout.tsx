import React from 'react'
import Navbar from '@/components/navbar'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="w-screen h-screen grid grid-cols-[auto,1fr]">
      <Navbar />
      <main className="grid grid-cols-[1fr,auto]">
        {children}
      </main>
    </div>
  );
}