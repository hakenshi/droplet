'use client'

import React, { useState } from 'react'
import { CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import IconButton from '../buttons/icon-button';
import { AlertCircle, Ellipsis, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { deletePost } from '@/app/(user)/profile/actions';
import UserPostDialog from '../user-profile/user-post-dialog';
import { usePathname } from 'next/navigation';
import PostBackButton from '../buttons/post-back-button';
import Link from 'next/link';

type PostHeaderProps = {
    author: User,
    user: User,
    post: PostSuccessResponse['post'],
    hasBackButton?: boolean
}

export default function PostHeader({ author, post, hasBackButton = false, user }: PostHeaderProps) {

    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const removePaddingTop = pathname.includes('/post/')

    return (
        <CardHeader className={`${removePaddingTop ? 'px-0' : ''} z-10`}>
            <div className='flex items-center gap-3'>
                {hasBackButton && <PostBackButton />}
                <Avatar>
                    <AvatarImage src={author.profile_image} alt="avatar" />
                    <AvatarFallback className="bg-sky-500 text-white">
                        {author.username.toUpperCase().substring(0, 2)}
                    </AvatarFallback>
                </Avatar>
                <div className='flex justify-between w-full'>
                    <div>
                        <div className='text-zinc-800 items-center gap-1'>
                            <div>
                                <p>{author.name ? `${author.name} ${author.surname}` : author.username}</p>
                                {post.post_type === "comment" && (
                                    <div className='text-zinc-500 text-sm'>
                                        Respondendo a
                                        <Link className='text-lime-500' href={`/profile/${author.username}`}>
                                            {` @${author.username}`}
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <p className='text-zinc-500 text-sm'>@{author.username}</p>
                            {/* <PostTime created_at={post.created_at} /> */}
                        </div>

                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <IconButton Icon={Ellipsis} color="blue" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='flex flex-col'>

                                {user.username === author.username && (
                                    <>
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
                                                        <Button onClick={async () => { await deletePost(post.id_string); setIsOpen(false); }} variant={'destructive'}>Excluir</Button>
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
                                    </>
                                )}
                                <IconButton className='p-5' Icon={AlertCircle} color="yellow" hasHoverEffect={false}>
                                    Denunciar
                                </IconButton>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </CardHeader>
    )
}
