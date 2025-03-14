'use client'

import { storePost, updatePost } from "@/app/(user)/profile/actions/actions";
import ResizeableTextArea from "@/components/posts/resizeable-textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useMoney } from "@/lib/hooks/useMoney";
import { CalendarIcon, CircleDollarSignIcon, ImageIcon } from "lucide-react";
import React, { FormEvent, useState } from 'react';
import MoneyInput from '../inputs/money-input';

interface PostFormData {
    post: string;
    donation: string
}

type UserPostProps = {
    id?: string,
    user: User,
    value?: string
    children: React.ReactNode
}

export default function UserPostDialog({ id, user, value, children }: UserPostProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isDonationOpen, setIsDonationOpen] = useState<boolean>(false)

    const [isHovering, setIsHovering] = useState<boolean>(false)
    const { clearDonationState, donation, formattedDonation } = useMoney()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const form = new FormData(e.target as HTMLFormElement)
        const formData = Object.fromEntries(form.entries()) as unknown as PostFormData
        if (value && id) {
            await updatePost({ id, user_id: user.id, content: formData.post })
        }
        else {
            await storePost({ user_id: user.id, content: formData.post, donation_goal: donation })
        }
        setIsOpen(false)
    }


    const handleOpenDonation = (open: boolean) => {
        setIsDonationOpen(open);
        if (!open) setIsHovering(false);
    }

    const handleCloseDonation = () => {
        if (donation >= 0 && donation < 10) {
            clearDonationState()
        }
        setIsHovering(false)
        setIsDonationOpen(false)
    }

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className='max-w-2xl w-full'>
                <DialogHeader>
                    <DialogTitle className=''>
                        <div className='flex items-center gap-2'>
                            <Avatar className='size-10'>
                                <AvatarImage src={user.profile_image} alt="avatar" />
                                <AvatarFallback className="bg-sky-500 text-white">
                                    {user.username.toUpperCase().substring(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <div className='font-normal text-md'>
                                <p>{user.name ? `${user.name} ${user.surname}` : user.username}</p>
                                <p className='text-sm text-zinc-500'>@{user.username}</p>
                            </div>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className='max-h-96 h-full'>
                    <form onSubmit={handleSubmit} className='space-y-2'>
                        <div>
                            <ResizeableTextArea placeholder='Qual seu pensamento?' defaultValue={value} name={'post'} />
                            <div className='text-zinc-500 text-sm px-2 pt-2'>
                                {formattedDonation && formattedDonation != "0.00" && !isDonationOpen && (<div className='flex items-center gap-2'>
                                    <p>Meta de doação: ${formattedDonation}</p>
                                    <button onClick={clearDonationState} className='text-sky-500 hover:text-sky-600'>Remover meta</button>
                                </div>)}
                            </div>
                        </div>
                        <div className='flex justify-between pt-2'>
                            <div className='flex gap-3'>
                                <HoverCard openDelay={1} closeDelay={1}>
                                    <HoverCardTrigger asChild>
                                        <button type='button'
                                            className='hover:bg-sky-500/10 p-2 rounded-full hover:text-sky-500 hover:cursor-pointer transition-colors'>
                                            <ImageIcon />
                                        </button>
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                        Adicionar imagem à postagem
                                    </HoverCardContent>
                                </HoverCard>
                                <HoverCard openDelay={1} closeDelay={1}>
                                    <HoverCardTrigger asChild>
                                        <button type='button'
                                            className='hover:bg-sky-500/10 p-2 hover:cursor-pointer rounded-full hover:text-sky-500 transition-colors'>
                                            <CalendarIcon className='' />
                                        </button>
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                        Agendar postagem
                                    </HoverCardContent>
                                </HoverCard>
                                <HoverCard openDelay={1} closeDelay={1}>
                                    <HoverCardTrigger asChild>
                                        <div>
                                            <Dialog onOpenChange={(open) => handleOpenDonation(open)} open={isDonationOpen}>
                                                <DialogTrigger asChild>
                                                    <button onClick={() => { setIsDonationOpen(true); setIsHovering(false); }} className="hover:bg-sky-500/10 p-2 hover:cursor-pointer rounded-full hover:text-sky-500 transition-colors">
                                                        <CircleDollarSignIcon />
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Adicionar meta de doação à postagem</DialogTitle>
                                                    </DialogHeader>
                                                    <MoneyInput name="donation" />
                                                    <DialogFooter>
                                                        <DialogClose onClick={() => handleCloseDonation()} asChild>
                                                            <Button>Salvar</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </HoverCardTrigger>
                                    {isHovering && !isDonationOpen && <HoverCardContent>Adicionar meta de doação</HoverCardContent>}
                                </HoverCard>
                            </div>
                            <div>
                                <Button className='rounded-full' type='submit'>
                                    {value && id ? "Salvar" : "Postar"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog >
    )
}