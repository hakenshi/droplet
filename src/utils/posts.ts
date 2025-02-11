export async function getUserPosts(token: string, username: string) {
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
