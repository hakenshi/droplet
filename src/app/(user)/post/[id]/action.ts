'use server'

import { getAuthUser } from "@/utils/getAuthUser"
import { revalidatePath, revalidateTag } from "next/cache"

type Payload = {
    id?: string
    user_id: number
    post_id: string
    parent_id?: string
    content: string
}

export async function getPost(postId: string) {
    try {
        const { token } = await getAuthUser();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/show/${postId}`, {
            cache: 'force-cache',
            next: {
                tags: ['post']
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Failed to fetch post: ${response.status} ${response.statusText} - ${errorDetails}`);
        }

        const { data }: { data: PostSuccessResponse } = await response.json();

        return {
            author: data.author,
            post: data.post,
        };
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}

export async function getPostComments(postId: string): Promise<{ comments: CommentSuccessResponse[] }> {
    try {
        const { token } = await getAuthUser();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comment`, {
            next: {
                tags: ['comments']
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const { data }: { data: CommentSuccessResponse[] } = await response.json()

        return {
            comments: data
        }

    } catch (error) {
        console.error('Error fetching post comments:', error);
        throw error;
    }
}

export async function storeLikeComment(commentId: string, userId: number) {

    try {
        const { token } = await getAuthUser();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/comment/like/${commentId}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ user_id: userId })
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Failed to like comment: ${response.status} ${response.statusText} - ${errorDetails}`);
        }

        const responseData = await response.json();
        console.log('Comment liked successfully:', responseData);
        revalidateTag('posts')
    } catch (error) {
        console.error('Error liking comment:', error);
        throw error;
    }

}

export async function storeComment(data: Payload): Promise<void> {
    try {
        const { token } = await getAuthUser();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/comment`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Failed to store comment: ${response.status} ${response.statusText} - ${errorDetails}`);
        }

        revalidatePath(`/post/${data.post_id}`);
    } catch (error) {
        console.error('Error storing comment:', error);
        throw error;
    }
}

export async function updateComment(commentId: string, content: string, userId: number, postId: string) {
    try {
        const { token } = await getAuthUser()
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/comment/${commentId}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ content, user_id: userId, post_id: postId })
        })

        if (!response.ok) {
            const errorDetails = await response.text()
            throw new Error(`Failed to update comment: ${response.status} ${response.statusText} - ${errorDetails}`)
        }

        const data = await response.json()
        console.log(data)
        revalidateTag("comments")
    }
    catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
}

export async function storeReply(data: Payload) {

    try {
        const { token } = await getAuthUser()

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/comment/reply/${data.id}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Failed to store comment: ${response.status} ${response.statusText} - ${errorDetails}`)
        }
        const responseData = await response.json()
        console.log(responseData)
        revalidatePath(`/post/${data.post_id}`)
    }
    catch (e) {
        console.error("Error storing comment: ", e)
        throw e
    }
}

export async function deleteComment(postId: string) {
    try {
        const { token } = await getAuthUser()

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/comment/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
                'Accept': "application/json",
            }
        })

        if (response.status === 204) {
            revalidateTag('posts')
            return { success: true };
        } else {
            const errorText = await response.text();
            throw new Error(`Deletion failed for post "${postId}": ${errorText}`);
        }
    } catch (error) {
        const detailedMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Error in deletePost:", detailedMessage);
        return { error: detailedMessage };
    }
}
