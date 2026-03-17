'use client'
import React, { useState } from 'react'
import { CardFooter } from '../ui/card'
import IconButton from '../buttons/icon-button'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import UserCommentDialog from '../user-profile/user-comment-dialog'
import { storeLikeComment } from '@/app/(user)/post/[id]/action'

export default function CommentFooter({ comment, user, value }: { comment: CommentSuccessResponse['comment'], user: User, value?: string }) {

    const [isLiking, setIsLiking] = useState(false)

    const likeComment = async () => {
        setIsLiking(true)
        await storeLikeComment(comment.id_string, user.id)
        setTimeout(() => setIsLiking(false), 1000)
    }


    return (
        <CardFooter className='p-2'>
            <div className='flex justify-between w-full'>
                <div className='flex'>
                    <IconButton disabled={isLiking} onClick={likeComment} Icon={Heart} color={'red'} hasLiked={comment.post_likes.has_liked}>
                        {comment.post_likes.count}
                    </IconButton>
                    <UserCommentDialog commentId={comment.id_string} isReplying={!comment.parent_id ? true : false} parentId={comment.parent_id} user={user} value={value} postId={comment.post_id_string} >
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
