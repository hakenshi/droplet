type CommentSuccessResponse = {
    author: User;
    comment: {
        id: number;
        id_string: string;
        post_id: number;
        post_id_string: string;
        parent_id: number | null;
        parent_id_string: string | null;
        content: string;
        post_replies: {
            count: number;
            replies: any[];
        };
        post_likes: {
            count: number;
            has_liked: boolean;
        };
        created_at: string;
    };
};

type CommentErrorResponse = {
    post_id?: string[];
    parent_id?: string[];
    user_id?: string[];
    content?: string[];
};

type CommentResponse = ApiSuccessResponse<CommentSuccessResponse> | ApiErrorResponse<CommentErrorResponse>;
