'use client'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import IconButton from '@/components/icon-button'
import { User } from 'lucide-react'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

interface UserProfileDialogProps {
    user: User
    dialogState: boolean
    setDialogSate: Dispatch<SetStateAction<boolean>>
    children: ReactNode
}

export default function UserProfileDialog({ user, children, dialogState: dialogState, setDialogSate: setDialogState }: UserProfileDialogProps) {

    return (
        <Dialog open={dialogState} onOpenChange={setDialogState}>
            <DialogTrigger asChild>
                <Button onClick={() => setDialogState(true)} className='rounded-full bg-sky-500 hover:bg-sky-600 transition-colors duration-200 shadow-md border-2 border-zinc-50'>
                    Editar Perfil
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl w-full'>
                <DialogHeader>
                    <DialogTitle className='flex items-center'>
                        Editar Perfil
                    </DialogTitle>
                </DialogHeader>
                <form action="" className='max-h-[40rem] h-full grid grid-rows-[auto_1fr]'>
                    <div className='mb-5'>
                        {children}
                        <div className='relative w-fit flex flex-col justify-center items-start ml-3 -mt-24 z-30'>
                            <Image className='rounded-full border-4 border-white shadow-md' width={125} height={125} src={"https://pbs.twimg.com/profile_images/1865591206048137216/VQeLKnUq_400x400.jpg"} alt={`${user.name}'s background image`} />
                        </div>
                    </div>
                    <div className='overflow-y-scroll px-5'>
                        <div className='px-2 py-1'>
                            <Label>
                                Nome
                            </Label>
                            <Input />
                        </div>
                        <div className='px-2 py-3'>
                            <Label>
                                Sobrenome
                            </Label>
                            <Input />
                        </div>
                        <div className='px-2 py-3'>
                            <Label>
                                Bio
                            </Label>
                            <Textarea className='resize-none' />
                        </div>
                    </div>
                    <DialogFooter className='px-2 pt-5'>
                        <Button>Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
