'use server'

import { getAuthUser } from '@/utils/getAuthUser';

export async function getReply(replyId: string) {

    const { token } = await getAuthUser()

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/comment/show/${replyId}`, {
        cache: 'force-cache',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    const { data } = await response.json()
    
    return {
        reply: data.reply,
        post: {
            author: data.post.author,
            ...data.post.post
        },
        comment: data.parent_comment && {
            author: data.parent_comment.author,
            ...data.parent_comment.comment
        }
    }
}
