'use client'

import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../ui/dialog'
import { Button, buttonVariants } from '../ui/button'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { unfollowUser } from '@/app/(user)/profile/actions/actions'
import { toast } from 'sonner'

export default function UnfollowButton({ user }: { user: User }) {

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleUnfollow = async () => {
        try {
            setLoading(true)
            await unfollowUser(user.username, user.id)
            toast.success('Deixou de seguir com sucesso')
            setIsOpen(false)
        } catch (error) {
            toast.error('Erro ao deixar de seguir')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger asChild>
                <Button variant={'destructiveRounded'}>Deixar de Seguir</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Deixar de Seguir</DialogTitle>
                </DialogHeader>
                <DialogDescription className='text-zinc-500 my-7'>
                    Tem certeza de que deixar de seguir <span className='text-lime-500'>@{user.username}</span>?
                </DialogDescription>
                <DialogFooter>
                    <Button onClick={handleUnfollow} variant={'default'} disabled={loading}>
                        {loading ? 'Processando...' : 'Confirmar'}
                    </Button>
                    <DialogClose className={buttonVariants({ variant: 'destructive' })} disabled={loading}>
                        Cancelar
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
