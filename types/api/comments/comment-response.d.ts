type CommentSuccessResponse = {
    author: User,
    comment: PostMinimalResponse['post']
}

type PostErrorResponse = {
    post_id?: string[]
    parent_id?: string[]
    user_id?: string[]
    content?: string[]
}

type PostResponse = ApiSucessReponse<CommentSuccessResponse> | ApiErrorResponse<PostErrorResponse>
