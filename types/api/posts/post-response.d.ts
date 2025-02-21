type PostMinimalResponse = {
    post: {
        id: int
        id_string: string
        post_id: number
        post_id_string: string
        parent_id?: int
        parent_id_string?: string
        content: string
        post_replies: {
            count: number,
            
        }
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
        id_string: string
        post_redirect_id: string
        post_type: "comment" | "post"
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
