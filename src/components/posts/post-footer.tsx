'use client'
import { storeLikeComment } from '@/app/(user)/post/[id]/action'
import { storeLikePost } from '@/app/(user)/profile/actions'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Heart, MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import IconButton from '../buttons/icon-button'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import UserCommentDialog from '../user-profile/user-comment-dialog'
import MoneyInput from '../inputs/money-input'

export default function PostFooter({ post, user, value }: { post: PostSuccessResponse['post'], user: User, value?: string }) {

    const [isLiking, setIsLiking] = useState(false)

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
        <CardFooter className='p-2'>
            <div className='flex flex-col gap-5 justify-between w-full'>
                {post.donation_goal && (
                    <Card>
                        <CardContent>
                            <CardHeader>
                                <CardTitle className='flex justify-between text-lg'>
                                    <p>Meta de Doação</p>
                                    <p>$0.00 / ${post.donation_goal}</p>
                                </CardTitle>
                            </CardHeader>
                            <CardFooter className='justify-end gap-2'>
                                <Button variant={"ghost"} >$5</Button>
                                <Button variant={"ghost"} >$10</Button>
                                <Button variant={"ghost"} >$20</Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant={"ghost"}>+$20</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Enviar Doação
                                            </DialogTitle>
                                        </DialogHeader>
                                        <form action="">
                                            <MoneyInput donationValue={post.donation_goal} name='dontation' />
                                            <span className='flex my-2 justify-end'><Button>Doar</Button></span>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </CardContent>
                    </Card>
                )}
                <div className='flex'>
                    <IconButton disabled={isLiking} onClick={likePost} Icon={Heart} color={'red'} hasLiked={post.post_likes.has_liked}>
                        {post.post_likes.count}
                    </IconButton>
                    <UserCommentDialog isReplying={false} postId={post.id_string} user={user} value={value} >
                        <IconButton Icon={MessageCircle} color="blue">
                            {post.post_comments.count}
                        </IconButton>
                    </UserCommentDialog>
                </div>

            </div>
        </CardFooter>
    )
}
