'use client'

import React, { FormEvent, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarIcon, ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ResizeableTextArea from "@/components/posts/resizeable-textarea";
import { Button } from "@/components/ui/button";
import { storeComment } from '@/app/(user)/post/[id]/action';

interface PostFormData {
    post: string;
}

type UserPostProps = {
    postId: number,
    user: User,
    value?: string
    children: React.ReactNode
}

export default function UserCommentDialog({ postId, user, value, children }: UserPostProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const form = new FormData(e.target as HTMLFormElement)
        const formData = Object.fromEntries(form.entries()) as unknown as PostFormData

        // if (value && id) {
        //     await updatePost({ id, user_id: user.id, content: formData.post })
        // }
        // else {
        await storeComment({ post_id: postId, user_id: user.id, content: formData.post })
        // }
        setIsOpen(false)
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
                                <AvatarImage src={"/avatar.png"} alt="avatar" />
                                <AvatarFallback className="bg-sky-500 text-white">
                                    {user.username.toUpperCase().substring(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <p className='font-normal text-md'>
                                {user.username}
                            </p>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className='max-h-96 h-full'>
                    <form onSubmit={handleSubmit} className='space-y-2'>
                        <div>
                            <ResizeableTextArea placeholder='Qual seu pensamento?' defaultValue={value} name={'post'} />
                        </div>
                        <div className='flex justify-between pt-2'>
                            <div className='flex gap-2'>
                                <button type='button'
                                    className='hover:bg-sky-500/10 p-2 rounded-full hover:text-sky-500 hover:cursor-pointer transition-colors'>
                                    <ImageIcon className='' />
                                </button>
                                <button type='button'
                                    className='hover:bg-sky-500/10 p-2 hover:cursor-pointer rounded-full hover:text-sky-500 transition-colors'>
                                    <CalendarIcon className='' />
                                </button>
                            </div>
                            <div>
                                <Button className='rounded-full' type='submit'>
                                    Comentar
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>

    )
}
