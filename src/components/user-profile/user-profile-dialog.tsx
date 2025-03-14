'use client'
import React, { Dispatch, FormEvent, ReactNode, SetStateAction } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { updateUserProfile } from '@/app/(user)/profile/actions/actions'

interface UserProfileDialogProps {
    user: User
    dialogState: boolean
    setDialogSate: Dispatch<SetStateAction<boolean>>
    children: ReactNode
}

export default function UserProfileDialog({ children, dialogState: dialogState, setDialogSate: setDialogState, user }: UserProfileDialogProps) {

    const submit = async (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        await updateUserProfile(formData)
        setDialogState(false)
    }

    return (
        <Dialog open={dialogState} onOpenChange={setDialogState}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setDialogState(true)}
                    className='rounded-full bg-sky-500 hover:bg-sky-600 transition-colors duration-200 shadow-md border-2 border-zinc-50'>
                    Editar Perfil
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-[45rem] w-full'>
                <DialogHeader>
                    <DialogTitle className='flex items-center'>
                        Editar Perfil
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className='mb-5'>
                        {children}
                    </div>
                    <div className='overflow-y-scroll px-5'>
                        <div className='px-2 py-1'>
                            <Label>
                                Nome
                            </Label>
                            <Input defaultValue={user.name ?? ""} name='name' />
                        </div>
                        <div className='px-2 py-3'>
                            <Label>
                                Sobrenome
                            </Label>
                            <Input defaultValue={user.surname ?? ""} name='surname' />
                        </div>
                        <div className='px-2 py-3'>
                            <Label>
                                Bio
                            </Label>
                            <Textarea defaultValue={user.bio ?? ""} name='bio' className='resize-none' />
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
