'use server'

import { getAuthUser } from "@/utils/getAuthUser";
import { revalidateTag } from "next/cache";
import { updateAuthUser } from "@/utils/session";

type Payload = {
    id?: string
    user_id: number
    content: string
    donation_goal?: number
}

export async function getUserProfile(username: string): Promise<User> {
    try {
        const { user, token } = await getAuthUser()

        if (username === user.username) {
            return user
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
                'Accept': "application/json",
            }
        })

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch profile for "${username}": ${errorText}`);
        }

        const { data }: { data: User } = await response.json()

        return data
    } catch (error) {
        const detailedMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Error in getUserProfile:", detailedMessage);
        throw new Error(`Error fetching user profile for "${username}": ${detailedMessage}`);
    }
}

export async function updateUserProfile(data: FormData) {
    const { token, user } = await getAuthUser()

    const coverImage = data.get('cover') as File
    const profileImage = data.get('icon') as File

    if (coverImage.size <= 0) {
        data.delete('cover')
    }
    if (profileImage.size <= 0) {
        data.delete('icon')
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${user.id}?_method=PATCH`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: data
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || `Error ${response.status}: ${response.statusText}`);
        }

        const updatedUser = await response.json();

        await updateAuthUser(updatedUser.data)

        return updatedUser;
    } catch (error) {
        const detailedMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Error updating user profile:", detailedMessage);
        return { error: detailedMessage };
    }
}

export async function getUserPosts(username: string) {
    try {
        const { token } = await getAuthUser()

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

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch posts for "${username}": ${errorText}`);
        }

        const { data }: { data: PostResponse[] } = await response.json()

        return {
            posts: data
        }
    } catch (error) {
        const detailedMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Error in getUserPosts:", detailedMessage);
        return { error: detailedMessage };
    }
}

export async function getUserLikedPosts(username: string) {
    try {
        const { token } = await getAuthUser()

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/liked/${username}`, {
            next: {
                tags: ['posts']
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
                'Accept': "application/json",
            }
        })

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch liked posts for "${username}": ${errorText}`);
        }

        const { data } = await response.json()

        return {
            likedPosts: data
        }
    } catch (error) {
        const detailedMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Error in getUserLikedPosts:", detailedMessage);
        return { error: detailedMessage };
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
            const errorData = await response.json();
            throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
        }
        const postData: PostResponse = await response.json();
        revalidateTag("posts");
        return postData;
    } catch (error) {
        const detailedMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Error storing post:", detailedMessage);
        return { error: detailedMessage };
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
            const errorData = await response.json();
            throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
        }
        const postData: PostResponse = await response.json();

        revalidateTag("posts");

        return postData;

    } catch (error) {
        const detailedMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Error updating post:", detailedMessage);
        return { error: detailedMessage };
    }
}

export async function storeLikePost(postId: string, isPostPage: boolean) {
    try {
        const { token, user } = await getAuthUser()

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/like`, {
            method: 'POST',
            body: JSON.stringify({ post_id: postId, user_id: user.id }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to like post "${postId}": ${errorText}`);
        }

        if (isPostPage) {
            revalidateTag('posts')
        }
        else {
            revalidateTag('post')
        }

    } catch (error) {
        const detailedMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Error in storeLikePost:", detailedMessage);
        return { error: detailedMessage };
    }
}

export async function deletePost(postId: string) {
    try {
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
