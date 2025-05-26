'use client'

import { Button } from '@/components/ui/button'
import { Lock, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { storeToken } from './actions'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'

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
    <div className=" flex flex-col lg:h-screen lg:grid place-items-center bg-zinc-100">
      <div className=" flex flex-col lg:grid grid-cols-2 h-2/3 w-4/5  lg:w-full max-w-5xl gap-10 rounded-2xl bg-white shadow-md mt-20 lg:mt-0 ">
        <div className="h-full rounded-tl-2xl rounded-bl-2xl bg-gradient p-5 text-white">
          <div className="flex h-3/4 flex-col items-center justify-evenly space-y-6">
            <div className="inline-flex items-center justify-center space-x-4">
              <Image src="/logo.png" alt="droplet logo" width={50} height={50} />
              <p className="text-4xl lg:text-5xl font-black">DROPLET</p>
            </div>
            <p className="px-8 text-center text-xl font-bold">
              Liberdade para criar
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-evenly gap-5 py-5 px-5 ">
          <p className="text-2xl font-semibold">Faça login</p>
          <form onSubmit={submit} className="flex flex-col gap-5">
            <div className="flex w-11/12 items-center gap-4">
              <Mail />
              <Input name="email" placeholder="E-mail" type="email" />
            </div>
            {errors?.errors?.email && (
              <span className="px-4 text-sm text-red-500">{errors.errors.email}</span>
            )}
            <div className="flex w-11/12 items-center gap-4">
              <Lock />
              <Input name="password" placeholder="Senha" type="password" />
            </div>
            {errors?.errors?.password && (
              <span className="px-4 text-sm text-red-500">{errors.errors.password}</span>
            )}
            <div className="flex w-11/12 flex-col gap-2 rounded-md px-2 py-4 text-zinc-600">
              <Button
                disabled={loading}
                className={`w-full rounded-full font-bold uppercase ${buttonColors[buttonState]}`}
              >
                {loading ? <span className="loader" /> : "Entrar"}
              </Button>
              <div className="flex justify-between p-2">
                <Link className="hover:text-zinc-800" href="/register">
                  Inscreva-se
                </Link>
                <Link className="hover:text-zinc-800" href="/reset-password">
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
          </form>
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 rounded-md text-white">
              <Button className="flex w-full items-center gap-4 px-8 rounded-full border bg-sky-white text-black hover:bg-zinc-200">
                <Image src="/google-logo.png" alt="google logo" width={25} height={25} />
                <span className="font-bold uppercase text-sm">Iniciar sessão com o google</span>
              </Button>
            </div>
            <div className="flex gap-2 rounded-md ">
              <Button className="flex w-full items-center gap-4 px-8 rounded-full border bg-sky-white text-black hover:bg-zinc-200">
                <Image src="/twitter-x-logo.png" alt="twitter logo" width={25} height={25} />
                <span className="font-bold uppercase text-sm">Iniciar sessão com o twitter</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
