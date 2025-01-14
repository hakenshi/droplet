import Image from 'next/image'
import React from 'react'
import logo from "../../../public/logo.png"

export default function Login() {
  return (
    <div className='h-screen bg-zinc-100 grid place-items-center'>
      <div className='grid grid-cols-2 max-w-5xl w-full bg-white rounded-2xl h-2/3 shadow-md gap-10'>
        <div className='bg-gradient-to-br text-white from-blue-600 via-sky-500 to-lime-100 p-5 rounded-tl-2xl rounded-bl-2xl'>
          <div className='flex flex-col justify-evenly items-center h-3/4 space-y-6'>
            <div className='inline-flex items-center justify-center space-x-4'>
              <Image src={logo} alt='droplet logo' width={75} height={75} />
              <p className='font-black text-5xl'>DROPLET</p>
            </div>
            <p className='text-center font-bold text-xl px-8'>
              Liberdade para criar
            </p>
          </div>
        </div>
        <div className='py-5 font-semibold'>
            <p className='text-2xl'>Faça login</p>
          <form action="">
            <div>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
