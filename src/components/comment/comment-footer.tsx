'use client'
import { storeLikePost } from '@/app/(user)/profile/actions'
import React, { useState } from 'react'
import { CardFooter } from '../ui/card'
import IconButton from '../buttons/icon-button'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import UserCommentDialog from '../user-profile/user-comment-dialog'

export default function CommentFooter({ comment, user, value }: { comment: CommentSuccessResponse['comment'], user: User, value?: string }) {

    const [isLiking, setIsLiking] = useState(false)

    const likePost = async () => {
        setIsLiking(true)
        await storeLikePost(comment.id)
        setTimeout(() => setIsLiking(false), 1000)
    }

    return (
        <CardFooter className='p-2'>
            <div className='flex justify-between w-full'>
                <div className='flex'>
                    <IconButton disabled={isLiking} onClick={likePost} Icon={Heart} color={'red'} hasLiked={comment.post_likes.has_liked}>
                        {comment.post_likes.count}
                    </IconButton>
                    <UserCommentDialog user={user} value={value} postId={comment.id} >
                        <IconButton Icon={MessageCircle} color="blue">
                            {comment.post_replies.count}
                        </IconButton>
                    </UserCommentDialog>
                </div>
                <div>
                    <IconButton Icon={Share2} color="green" hasHoverEffect={false} />
                </div>
            </div>
        </CardFooter>
    )
}
