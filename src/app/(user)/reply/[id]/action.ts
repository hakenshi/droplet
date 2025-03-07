'use server'

import { getAuthUser } from '@/utils/getAuthUser';

export async function getReply(replyId: string) {

    const { token } = await getAuthUser()

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/comment/show/${replyId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    const { data } = await response.json()

    return {
        reply: data.reply,
        post: data.post,
        comment: data.parent_comment
    }
}
