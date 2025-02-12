'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { AlertCircle, DollarSign, Ellipsis, Heart, MessageCircle, Pencil, Share2, Trash2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import PostTime from './post-time'
import IconButton from '../icon-button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useState } from 'react'
import { Button } from '../ui/button'
import { deletePost, storeLikePost } from '@/app/(user)/profile/actions'
import UserPostDialog from '../user-profile/user-post-dialog'
import Link from 'next/link'

interface PostProps {
    author: User
    post: Post & {
        post_comments: {
            count: number
        }
        post_likes: {
            count: number
        }
    }
    authUsername?: string
}

export default function Post({ author, post }: PostProps) {

    const [isOpen, setIsOpen] = useState(false)

    const [isLiking, setIsLiking] = useState(false)

    const likePost = async () => {
        setIsLiking(true)
        await storeLikePost(post.id)
        setTimeout(() => setIsLiking(false), 1000)
    }

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
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <IconButton Icon={Ellipsis} color="blue" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='flex flex-col'>
                                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                            <DialogTrigger asChild>
                                                <IconButton className='p-5' Icon={Trash2} color="red" hasHoverEffect={false}>
                                                    Excluir
                                                </IconButton>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Excluir Postagem?
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <div className='text-zinc-700 font-b'>
                                                    <p>
                                                        Tem certeza que deseja excluir essa postagem?
                                                        Essa ação é irreversível, sua publicação/postagem será excluída permanentemente.
                                                    </p>
                                                </div>
                                                <DialogFooter>
                                                    <div className='flex justify-end gap-3'>
                                                        <Button onClick={async () => { await deletePost(post.id); setIsOpen(false); }} variant={'destructive'}>Excluir</Button>
                                                        <Button onClick={() => setIsOpen(false)}>
                                                            Cancelar
                                                        </Button>
                                                    </div>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <UserPostDialog user={author} value={post.content} id={post.id}>
                                            <IconButton className='p-5' Icon={Pencil} color="blue" hasHoverEffect={false}>
                                                Editar
                                            </IconButton>
                                        </UserPostDialog>
                                        <IconButton className='p-5' Icon={AlertCircle} color="yellow" hasHoverEffect={false}>
                                            Denunciar
                                        </IconButton>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardDescription>
                    <p className='text-black px-4 py-2'>
                        {post.content}
                    </p>
                </CardDescription>
                <CardFooter className='p-2'>
                    <div className='flex justify-between w-full'>
                        <div className='flex'>
                            <IconButton disabled={isLiking} onClick={likePost} Icon={Heart} color='red'>
                                {post.post_likes.count}
                            </IconButton>
                            <Link href={`/post/${post.id}`}>
                                <IconButton Icon={MessageCircle} color="blue">
                                    {post.post_comments.count}
                                </IconButton>
                            </Link>
                            {post.donation_goal && <IconButton Icon={DollarSign} color="green" />}
                        </div>
                        <div>
                            <IconButton Icon={Share2} color="green" hasHoverEffect={false} />
                        </div>
                    </div>
                </CardFooter>
            </CardContent>
        </Card>
    )
}
