import React from 'react'
import { CardDescription } from '../ui/card'

export default function PostContent({ post }: { post: PostSuccessResponse['post'] }) {
    return (
        <CardDescription className='z-10'>
            <p className='text-black px-4 py-2 w-fit'>
                {post.content}
            </p>
        </CardDescription>)
}
