'use client'
import { storeLikePost } from '@/app/(user)/profile/actions'
import React, { useState } from 'react'
import { CardFooter } from '../ui/card'
import IconButton from '../buttons/icon-button'
import { DollarSign, Heart, MessageCircle, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function PostFooter({ post }: { post: PostSuccessResponse['post'] }) {

    const [isLiking, setIsLiking] = useState(false)

    const likePost = async () => {
        setIsLiking(true)
        await storeLikePost(post.id)
        setTimeout(() => setIsLiking(false), 1000)
    }

    return (
        <CardFooter className='p-2'>
            <div className='flex justify-between w-full'>
                <div className='flex'>
                    <IconButton disabled={isLiking} onClick={likePost} Icon={Heart} color={'red'} hasLiked={post.post_likes.has_liked}>
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
    )
}
