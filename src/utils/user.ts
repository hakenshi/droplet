export async function getUsers(token: string) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        cache: 'force-cache',
        next: { revalidate: 120 },
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'Accept': "application/json",
        },
    });

    const { data }: { data: User[] } = await response.json()

    return {
        users: data
    }
}