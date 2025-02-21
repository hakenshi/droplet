'use client'
import { storeLikePost } from '@/app/(user)/profile/actions'
import React, { useState } from 'react'
import { CardFooter } from '../ui/card'
import IconButton from '../buttons/icon-button'
import { DollarSign, Heart, MessageCircle, Share2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import UserCommentDialog from '../user-profile/user-comment-dialog'
import { storeLikeComment } from '@/app/(user)/post/[id]/action'
import PostTime from './post-time'

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
            <div className='flex justify-between w-full'>
                <div className='flex'>
                    <IconButton disabled={isLiking} onClick={likePost} Icon={Heart} color={'red'} hasLiked={post.post_likes.has_liked}>
                        {post.post_likes.count}
                    </IconButton>
                    <UserCommentDialog isReplying={false} postId={post.id_string} user={user} value={value} >
                        <IconButton Icon={MessageCircle} color="blue">
                            {post.post_comments.count}
                        </IconButton>
                    </UserCommentDialog>
                    {post.donation_goal && <IconButton Icon={DollarSign} color="green" />}
                </div>
            </div>
        </CardFooter>
    )
}
