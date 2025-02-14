import React from 'react'
import { CardDescription } from '../ui/card'

export default function PostContent({ post }: { post: PostSuccessResponse['post'] }) {
    return (
        <CardDescription>
            <p className='text-black px-4 py-2'>
                {post.content}
            </p>
        </CardDescription>)
}
