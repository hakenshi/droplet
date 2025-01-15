'use client'

import { Button } from '@/components/ui/button'
import { Lock, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { storeToken } from './actions'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'

const buttonColors = {
  'default': 'bg-sky-500 hover:bg-sky-600',
  'error': 'bg-red-600 hover:bg-red-700',
  'sucess': 'bg-green-500 hover:bg-green-600',
}

export default function Login() {

  const router = useRouter()

  const [errors, setErrors] = useState<ApiErrorResponse<LoginError> | null>(null)

  const [loading, setLoading] = useState(false)
  const [buttonState, setButtonState] = useState<'default' | 'error' | 'sucess'>('default')

  const submit = async (e: FormEvent) => {

    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.target as HTMLFormElement)
    const formData = Object.fromEntries(form.entries())

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(formData),
    })

    const data: LoginResponse = await response.json()

    if (data?.errors) {
      setErrors({ errors: data.errors, message: data.message })
      setButtonState('error')
      setLoading(false)
      return
    }


    const { status } = await storeToken(data)

    if (status === 200) {
      setButtonState('sucess')
      setLoading(false)
      router.replace("/")
    }
  }

  return (
    <div className='h-screen bg-zinc-100 grid place-items-center'>
      <div className='grid grid-cols-2 max-w-5xl w-full bg-white rounded-2xl h-2/3 shadow-md gap-10'>
        <div className='bg-gradient-to-br text-white from-blue-600 via-sky-500 to-lime-100 p-5 rounded-tl-2xl rounded-bl-2xl'>
          <div className='flex flex-col justify-evenly items-center h-3/4 space-y-6'>
            <div className='inline-flex items-center justify-center space-x-4'>
              <Image src={"/logo.png"} alt='droplet logo' width={75} height={75} />
              <p className='font-black text-5xl'>DROPLET</p>
            </div>
            <p className='text-center font-bold text-xl px-8'>
              Liberdade para criar
            </p>
          </div>
        </div>
        <div className='py-5 flex flex-col gap-5 justify-evenly'>
          <p className='text-2xl font-semibold'>Faça login</p>
          <form onSubmit={submit} className='flex flex-col gap-5'>
            <div className='bg-zinc-100 rounded-full px-4 py-5 w-11/12 flex gap-4 text-zinc-600'>
              <Mail />
              <input name='email' placeholder='E-mail' type="text" className='w-full bg-zinc-100 focus:outline-none font-medium text-zinc-600' />
            </div>
            {errors?.errors?.email && <span className='text-red-500 px-4 text-sm'>{errors.errors.email}</span>}
            <div className='bg-zinc-100 rounded-full px-4 py-5 w-11/12 flex gap-4 text-zinc-600'>
              <Lock />
              <input name='password' placeholder='Senha' type="password" className='w-full bg-zinc-100 focus:outline-none font-medium text-zinc-600' />
            </div>
            {errors?.errors?.password && <span className='text-red-500 px-4 text-sm'>{errors.errors.password}</span>}
            <div className='rounded-md px-2 py-4 w-11/12 flex flex-col gap-2 text-zinc-600'>
              <Button disabled={loading} className={`w-full rounded-full uppercase font-bold ${buttonColors[buttonState]}`}>
                {loading ? (<span className='loader'></span>) : "Entrar"}
              </Button>
              <div className='flex justify-between p-2'>
                <Link className='hover:text-zinc-800' href={"/register"}>Inscreva-se</Link>
                <Link className='hover:text-zinc-800' href={"/reset-password"}>Esqueceu a senha?</Link>
              </div>
            </div>
          </form>
          <div className='flex flex-col gap-5'>
            <div className='rounded-md px-2 w-11/12 flex gap-2 text-white'>
              <Button className='w-full bg-sky-white rounded-full text-black hover:bg-zinc-200 border items-center flex gap-10'>
                <Image src={"/google-logo.png"} alt='google logo' width={30} height={30} />
                <span className='uppercase font-bold'>Iniciar sessão com o google</span>
              </Button>
            </div>
            <div className='rounded-md px-2 w-11/12 flex gap-2'>
              <Button className='w-full bg-sky-white rounded-full text-black hover:bg-zinc-200 border items-center flex gap-10'>
                <Image src={"/twitter-x-logo.png"} alt='twitter logo' width={30} height={30} />
                <span className='uppercase font-bold'>Iniciar sessão com o twitter</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
