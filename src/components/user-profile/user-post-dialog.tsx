'use client'

import { storePost, updatePost } from "@/app/(user)/profile/actions/actions";
import ResizeableTextArea from "@/components/posts/resizeable-textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useMoney } from "@/lib/hooks/useMoney";
import { CalendarIcon, CircleDollarSignIcon, ImageIcon } from "lucide-react";
import React, { FormEvent, useRef, useState } from 'react';
import MoneyInput from '../moneyInput/money-input';
import FormInput from "../formInput/FormInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { Textarea } from "../ui/textarea";

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

const PostSchema = z.object({
    post: z.string({ message: "Esse campo é obrigatorio" }),
    image: z.optional(z.any()),
    donation: z.optional(z.string())
   
})

type PostSchemaFormdata = z.infer<typeof PostSchema>

export default function UserPostDialog({ id, user, value, children }: UserPostProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isDonationOpen, setIsDonationOpen] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const [isHovering, setIsHovering] = useState<boolean>(false)
    const { clearDonationState, donation, formattedDonation } = useMoney()
    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const { handleSubmit, register, formState: { isSubmitting, errors }, setValue, watch } = useForm<PostSchemaFormdata>({
        resolver: zodResolver(PostSchema)
    })

   
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setSelectedImage(file);
            setValue("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
  
    async function SubmitPost(data: PostSchemaFormdata) {

        
        console.log(data)

        value && id ? await updatePost({ id, user_id: user.id, content: data.post }) :
        await storePost({ user_id: user.id, content: data.post, donation_goal: donation })

        setIsOpen(false)
        setSelectedImage(null)
        setImagePreview(null)
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
                    <form onSubmit={handleSubmit(SubmitPost)} className='space-y-2'>
                        <div>
                            <ResizeableTextArea placeholder="Qual é o seu Pensamento" {...register("post")} defaultValue={value}/>
                            {errors?.post && (<span className="px-4 text-sm text-red-500">{errors.post.message}</span>)}
                            {imagePreview && (
                                <div className="relative mt-2">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="max-h-48 rounded-lg object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedImage(null);
                                            setImagePreview(null);
                                        }}
                                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
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
                                            onClick={handleButtonClick}
                                            className='hover:bg-sky-500/10 p-2 rounded-full hover:text-sky-500 hover:cursor-pointer transition-colors'>
                                            <ImageIcon />
                                        </button>
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                        Adicionar imagem à postagem
                                    </HoverCardContent>
                                </HoverCard>
                                <input
                                    type="file"
                                    ref={inputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
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
                                                    <MoneyInput {...register("donation")}  />
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