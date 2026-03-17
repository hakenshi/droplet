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


export function getUserImage(type: "cover" | "profile", user: User) {
    const imagePath = user?.[`${type}_image`];

    if (!imagePath) return "/images/default-avatar.png";

    if (imagePath.startsWith("http") || imagePath.startsWith("blob")) {
        return imagePath;
    }

    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/storage/${imagePath}`;
}
