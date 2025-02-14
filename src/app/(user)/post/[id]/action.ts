'use server'

import { axiosInstance } from "@/utils/axios-instance"
import { getAuthUser } from "@/utils/getAuthUser"
import { revalidatePath } from "next/cache"
import { json } from "stream/consumers"

export async function getPost(id: number) {

    const { token } = await getAuthUser()

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/show/${id}`, {
        cache: 'force-cache',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const { data }: { data: PostSuccessResponse } = await response.json()

    return {
        post: data.post,
        author: data.author
    }
}

export async function getPostComments(postId: number): Promise<{ comments: CommentSuccessResponse[] }> {
    try {
        const { token } = await getAuthUser();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comment`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const {data}: { data: CommentSuccessResponse[] } = await response.json()

        return {
            comments: data
        }

    } catch (error) {
        console.error('Error fetching post comments:', error);
        throw error;
    }
}

export async function storeComment(data: FormData): Promise<void> {
    try {
        const { token } = await getAuthUser();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/comment`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: Number(data.get('user_id')),
                post_id: Number(data.get('post_id')),
                content: data.get('content')
            })
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Failed to store comment: ${response.status} ${response.statusText} - ${errorDetails}`);
        }

        revalidatePath(`/post/${Number(data.get('post_id'))}`);
    } catch (error) {
        console.error('Error storing comment:', error);
        throw error;
    }
} 