"use server"

import { getAuthUser } from "@/utils/getAuthUser";


export async function getAllPosts() {

    const { token } = await getAuthUser();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/index`,{
        cache: 'force-cache',
        next: {
            tags: ['post']
        },
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    if(!response.ok){
        const errorDetails = await response.text();
        throw new Error(`Failed to fetch post: ${response.status} ${response.statusText} - ${errorDetails}`);
    }

    const posts : {data : PostSuccessResponse[]} = await response.json()

    return {
        posts: posts.data
    }
}