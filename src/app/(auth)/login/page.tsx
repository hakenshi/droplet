'use client'

import { Button } from '@/components/ui/button'
import { Lock, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { storeToken } from './actions'
import { useRouter } from 'next/navigation'

const buttonColors = {
  'default': 'bg-sky-500 hover:bg-sky-600',
  'error': 'bg-red-600 hover:bg-red-700',
  'success': 'bg-green-500 hover:bg-green-600',
}

export default function Login() {

  const router = useRouter()

  const [errors, setErrors] = useState<ApiErrorResponse<AuthErrorResponse> | null>(null)

  const [loading, setLoading] = useState(false)
  const [buttonState, setButtonState] = useState<'default' | 'error' | 'success'>('default')

  const submit = async (e: FormEvent) => {
    
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.target as HTMLFormElement)
    const formData = Object.fromEntries(form.entries())

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      next: {
        tags: ['auth']
      },
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(formData),
    })

    const data: AuthResponse = await response.json()

    if ('errors' in data) {
      setErrors({ errors: data.errors, message: data.message })
      setButtonState('error')
      setLoading(false)
      return
    }
    else {
      const { status } = await storeToken(data as AuthSuccessResponse)

      if (status === 200) {
        setButtonState('success')
        setLoading(false)
        router.replace("/")
      }

    }
  }

  return (
    <div className='h-screen bg-zinc-100 grid place-items-center'>
      <div className='grid grid-cols-2 w-full max-w-5xl h-2/3 bg-white rounded-2xl shadow-md gap-10'>
        <div className='p-5 text-white bg-gradient-to-br from-blue-600 via-sky-500 to-lime-100 rounded-tl-2xl rounded-bl-2xl'>
          <div className='flex flex-col h-3/4 justify-evenly items-center space-y-6'>
            <div className='inline-flex items-center justify-center space-x-4'>
              <Image src={"/logo.png"} alt='droplet logo' width={75} height={75} />
              <p className='font-black text-5xl'>DROPLET</p>
            </div>
            <p className='text-center font-bold text-xl px-8'>
              Liberdade para criar
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='rounded-md px-2 w-11/12 flex gap-2 text-white'>
            <Button className='w-full flex items-center gap-10 text-black bg-sky-white border rounded-full hover:bg-zinc-200'>
              <Image src={"/google-logo.png"} alt='google logo' width={30} height={30} />
              <span className='uppercase font-bold'>Iniciar sessão com o google</span>
            </Button>
          </div>
          <div className='rounded-md px-2 w-11/12 flex gap-2'>
            <Button className='w-full flex items-center gap-10 text-black bg-sky-white border rounded-full hover:bg-zinc-200'>
              <Image src={"/twitter-x-logo.png"} alt='twitter logo' width={30} height={30} />
              <span className='uppercase font-bold'>Iniciar sessão com o twitter</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
