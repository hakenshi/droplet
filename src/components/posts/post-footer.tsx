'use client'
import { storeLikeComment } from '@/app/(user)/post/[id]/action'
import { storeLikePost } from '@/app/(user)/profile/actions/actions'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ChevronDown, Heart, MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import IconButton from '../buttons/icon-button'
import MoneyInput from '../inputs/money-input'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'
import UserCommentDialog from '../user-profile/user-comment-dialog'
import { motion } from "framer-motion"

export default function PostFooter({ post, user, value }: { post: PostSuccessResponse['post'], user: User, value?: string }) {

    const [isLiking, setIsLiking] = useState(false)
    const [isDonationCardHidden, setIsDonationCardHidden] = useState(true)

    const path = usePathname()

    const isPostPage = path.includes(`/post/${post.id}`)

    const likePost = async () => {
        setIsLiking(true)

        if (post.post_type && post.post_type === "post") await storeLikePost(post.id_string, isPostPage)

        else if (post.post_type && post.post_type === "comment") await storeLikeComment(post.id_string, user.id)

        else await storeLikePost(post.id_string, isPostPage)

        setTimeout(() => setIsLiking(false), 1000)
    }

    return (
        <CardFooter className='p-2 z-10'>
            <div className='flex flex-col gap-5 justify-between w-full'>
                <div className='flex relative z-10 w-fit'>
                    <IconButton disabled={isLiking} onClick={likePost} Icon={Heart} color={'red'} hasLiked={post.post_likes.has_liked}>
                        {post.post_likes.count}
                    </IconButton>
                    <UserCommentDialog isReplying={false} postId={post.id_string} user={user} value={value} >
                        <IconButton Icon={MessageCircle} color="blue">
                            {post.post_comments.count}
                        </IconButton>
                    </UserCommentDialog>
                    {Number(post.donation.goal) !== 0 && (
                        <IconButton onClick={() => setIsDonationCardHidden(!isDonationCardHidden)} hasHoverEffect={false} color='blue' Icon={ChevronDown}>
                            Exibir Doação
                        </IconButton>
                    )}
                </div>
                {post.post_type === "post" && Number(post.donation.goal) !== 0 && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: isDonationCardHidden ? 0 : 'auto' }}
                        transition={{ duration: 0.3 }}
                        className='overflow-hidden'
                    >
                        <Card className='relative z-10 text-sm'>
                            <CardContent className='p-4'>
                                <CardHeader className='px-4'>
                                    <CardTitle className='flex justify-between'>
                                        <p className='text-lg'>Meta de Doação</p>
                                        <p className='text-lg'>$0.00 / ${post.donation.goal}</p>
                                    </CardTitle>
                                </CardHeader>
                                <div className='flex justify-between text-zinc-500 text-xs pb-1 px-1'>
                                    <p>0%</p>
                                    <p>${post.donation.goal}</p>
                                </div>
                                <Progress value={(post.donation.total_value / Number(post.donation.goal)) * 100} max={Number(post.donation.goal)} className='h-2' />
                                <CardFooter className='flex justify-end gap-1 mt-1'>
                                    <Button variant="ghost" size="sm">$5</Button>
                                    <Button variant="ghost" size="sm">$10</Button>
                                    <Button variant="ghost" size="sm">$20</Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="sm">+$20</Button>
                                        </DialogTrigger>
                                        <DialogContent className='p-2'>
                                            <DialogHeader className='p-1'>
                                                <DialogTitle className='text-sm'>
                                                    Enviar Doação
                                                </DialogTitle>
                                            </DialogHeader>
                                            <form action="" className='p-1'>
                                                <MoneyInput donationValue={post.donation.goal} name='dontation' />
                                                <div className='flex my-1 justify-end'>
                                                    <Button type='submit' size="sm">Doar</Button>
                                                </div>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </div>
        </CardFooter>
    )
}
