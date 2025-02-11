'use server'

import { getAuthUser } from "@/utils/getAuthUser";
import { revalidateTag } from "next/cache";

type Payload = {
    user_id: number
    content: string
}

export async function storePost(data: Payload, token: string) {
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

