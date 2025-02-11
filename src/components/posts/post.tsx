'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { AlertCircle, DollarSign, Ellipsis, Heart, MessageCircle, Pencil, Share2, Trash2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import PostTime from './post-time'
import IconButton from '../icon-button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { deletePost } from '@/app/(user)/profile/actions'

interface PostProps {
    author: User
    post: Post
}

export default function Post({ author, post }: PostProps) {

    const [isOpen, setIsOpen] = useState(false)

    const [isEditing, setIsEditing] = useState(false)

    return (
        <Card className='rounded-sm shadow'>
            <CardContent>
                <CardHeader>
                    <div className='flex items-center gap-3'>
                        <Avatar>
                            <AvatarImage src={"/avatar.png"} alt="avatar" />
                            <AvatarFallback className="bg-sky-500 text-white">
                                {author.username.toUpperCase().substring(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <div className='flex justify-between w-full'>
                            <div>
                                <p className='text-zinc-800'>{author.name ? `${author.name} ${author.surname}` : author.username}</p>
                                <p className='text-zinc-500 text-sm'>@{author.username}</p>
                                <PostTime created_at={post.created_at} />
                            </div>
                            <div>
                                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <IconButton Icon={Ellipsis} color="blue" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='flex flex-col'>
                                            <DialogTrigger asChild>
                                                <IconButton className='p-5' Icon={Trash2} color="red" hasHoverEffect={false}>
                                                    Excluir
                                                </IconButton>
                                            </DialogTrigger>
                                            <IconButton onClick={() => setIsEditing(true)} className='p-5' Icon={Pencil} color="blue" hasHoverEffect={false}>
                                                Editar
                                            </IconButton>
                                            <DialogContent >
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Excluir Postagem?
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription className='space-y-5'>
                                                    <div>
                                                        <p>
                                                            Tem certeza que deseja excluir essa postagem?
                                                            Essa ação é irreversível, sua publicação/postagem será excluída permanentemente.
                                                        </p>
                                                    </div>
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <div className='flex justify-end gap-3'>
                                                        <Button onClick={async () => { await deletePost(post.id); setIsOpen(false); }} variant={'destructive'}>Excluir</Button>
                                                        <Button onClick={() => setIsOpen(false)}>
                                                            Cancelar
                                                        </Button>
                                                    </div>
                                                </DialogFooter>
                                            </DialogContent>
                                            <IconButton className='p-5' Icon={AlertCircle} color="yellow" hasHoverEffect={false}>
                                                Denunciar
                                            </IconButton>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardDescription>
                    <div className='px-5 py-3'>
                        {isEditing ? (
                            <form>
                                <Textarea defaultValue={post.content} />
                                <div className='w-full flex justify-end items-center gap-4'>
                                    <Button className='mt-3' type='submit'>
                                        Salvar
                                    </Button>
                                    <Button variant={'destructive'} className='mt-3' type='button' onClick={() => setIsEditing(false)}>
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        )
                            : (<p className='text-black px-4 py-2'>{post.content}</p>)}
                    </div>
                </CardDescription>
                <CardFooter className='p-2'>
                    <div className='flex justify-between w-full'>
                        {!isEditing && (
                            <>
                                <div className='flex'>
                                    <IconButton Icon={Heart} color='red'>
                                        100
                                    </IconButton>
                                    <IconButton Icon={MessageCircle} color="blue">
                                        20
                                    </IconButton>
                                    {post.donation_goal && <IconButton Icon={DollarSign} color="green" />}
                                </div>
                                <div>
                                    <IconButton Icon={Share2} color="green" hasHoverEffect={false} />
                                </div>
                            </>
                        )}
                    </div>
                </CardFooter>
            </CardContent>
        </Card>
    )
}
