type PostSuccessResponse = {
    author: User
    post: Post
}

type PostErrorResponse = {
    user_id?: string[]
    content?: string[]
    donation_goal: string[]
}

type PostResponse = ApiSucessReponse<PostSuccessResponse> | ApiErrorResponse<PostErrorResponse>
