type PostMinimalResponse = {
    post: {
        id: number;
        id_string: string;
        post_id: number;
        post_id_string: string;
        parent_id?: number | null;
        parent_id_string?: string | null;
        content: string;
        post_replies: {
            count: number;
            replies?: any[];
        };
        post_likes: {
            count: number;
            has_liked: boolean;
        };
        created_at: string;
    };
};

type PostSuccessResponse = {
    author: User;
    post: {
        id: number;
        id_string: string;
        content: string;
        donation: {
            goal: number | null;
            total_value: number;
        };
        post_images: string[] | null;
        post_comments: {
            count: number;
            replies_count: number;
        };
        post_likes: {
            count: number;
            has_liked: boolean;
        };
        created_at: string;
    };
};

type PostErrorResponse = {
    user_id?: string[];
    content?: string[];
    donation_goal?: string[];
};

type PostResponse = ApiSuccessResponse<PostSuccessResponse> | ApiErrorResponse<PostErrorResponse>;
