import React from 'react'
import { CardDescription } from '../ui/card'

export default function CommentContent({  comment }: { comment: CommentSuccessResponse['comment'] }) {
    return (
        <CardDescription>
            <p className='text-black px-4 py-2'>
                {comment.content}
            </p>
        </CardDescription>)
}
