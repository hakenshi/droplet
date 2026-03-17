import FormInput from '@/components/formInput/FormInput'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ResetPassword() {

  return (

    <section className="flex flex-col lg:h-screen lg:grid place-items-center bg-zinc-100">
      <div className="flex flex-col lg:grid grid-cols-2 gap-10 rounded-2xl bg-white shadow-md mt-20 lg:mt-0">
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

        <div className="flex flex-col gap-5 p-5">
          <p className="text-2xl font-semibold">Recuperação de senha</p>
          
          <form action="" className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex w-11/12 items-center gap-2">
                <Mail />
                <FormInput placeholder="E-mail" type="email"/>
              </div>
            </div>

            <div className="flex w-11/12 flex-col gap-2 rounded-md px-2 py-4 text-zinc-600">
              <Button className="rounded-full font-bold uppercase">Enviar por e-mail</Button>
              <div className="flex justify-between p-2">
                <Link className="hover:text-zinc-800" href="/login">
                  Entrar
                </Link>
                <Link className="hover:text-zinc-800" href="/register">
                  Inscreva-se
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

            <div className="flex gap-2 rounded-md">
              <Button className="flex w-full items-center gap-4 px-8 rounded-full border bg-sky-white text-black hover:bg-zinc-200">
                <Image src="/twitter-x-logo.png" alt="twitter logo" width={25} height={25} />
                <span className="font-bold uppercase text-sm">Iniciar sessão com o twitter</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  )
}
