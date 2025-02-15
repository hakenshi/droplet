'use server'

import { getAuthUser } from "@/utils/getAuthUser";
import { revalidateTag } from "next/cache";

type Payload = {
    id?: number
    user_id: number
    content: string
}

export async function getUserProfile(username: string): Promise<User> {

    const {user, token} = await getAuthUser()

    if(username === user.username){
        return user
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': "application/json",
        }
    })

    const { data }: { data: User } = await response.json()

    return data

}

export async function getUserPosts(username: string) {

    const {token} = await getAuthUser()

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${username}`, {
        next: {
            tags: ['posts']
        },
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': "application/json",
        }
    })

    const { data }: { data: PostResponse[] } = await response.json()

    return {
        posts: data
    }

}

export async function getUserLikedPosts(username: string) {

    const {token} = await getAuthUser()

    const respose = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/liked/${username}`, {
        next: {
            tags: ['posts']
        },
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': "application/json",
        }
    })

    const { data } = await respose.json()

    return {
        likedPosts: data
    }

}

export async function storePost(data: Payload) {

    const { token } = await getAuthUser()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/store`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Tenta obter detalhes do erro
            throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
        }
        const postData: PostResponse = await response.json();
        revalidateTag("posts");
        return postData;
    } catch (error) {
        console.error("Erro ao armazenar post:", error);
        return { error: error instanceof Error ? error.message : "Erro desconhecido" };
    }
}
export async function updatePost(data: Payload) {

    const { token } = await getAuthUser()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${data.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Tenta obter detalhes do erro
            throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
        }
        const postData: PostResponse = await response.json();
        revalidateTag("posts");
        return postData;
    } catch (error) {
        console.error("Erro ao armazenar post:", error);
        return { error: error instanceof Error ? error.message : "Erro desconhecido" };
    }
}

export async function storeLikePost(postId: number) {
    const { token, user } = await getAuthUser()

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/like`, {
        method: 'POST',
        body: JSON.stringify({ post_id: postId, user_id: user.id }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })

    revalidateTag('posts')
}

export async function deletePost(postId: number) {

    const { token } = await getAuthUser()

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': "application/json",
        }
    })

    if (response.status === 204) {
        revalidateTag('posts')
    }
}

