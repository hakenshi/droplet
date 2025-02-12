'use server'

import { getAuthUser } from "@/utils/getAuthUser"

export async function getPost(id: number) {

    const { token } = await getAuthUser()

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const { data } = await response.json()

    return {
        post: data
    }
}