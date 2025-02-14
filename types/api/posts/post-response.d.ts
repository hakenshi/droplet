type PostMinimalResponse = {
    post: {
        id: int
        content: string
        post_likes: {
            count: number
            has_liked: boolean
        }
        created_at: Date
    }
}

type PostSuccessResponse = {
    author: User
    post: Post & {
        post_comments: {
            count: number
        }
        post_likes: {
            count: number
            has_liked: boolean
        }
    }
}

type PostErrorResponse = {
    user_id?: string[]
    content?: string[]
    donation_goal: string[]
}

type PostResponse = ApiSucessReponse<PostSuccessResponse> | ApiErrorResponse<PostErrorResponse>
