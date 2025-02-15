'use client'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import IconButton from '@/components/buttons/icon-button'
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
            <DialogContent className='max-w-[45rem] w-full'>
                <DialogHeader>
                    <DialogTitle className='flex items-center'>
                        Editar Perfil
                    </DialogTitle>
                </DialogHeader>
                <form action="">
                    <div className='mb-5'>
                        {children}
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
