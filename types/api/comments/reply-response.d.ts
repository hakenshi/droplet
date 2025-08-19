interface ReplyResponse {
    reply: {
        id: number;
        id_string: string;
        post_id: number;
        post_id_string: string;
        parent_id: number;
        parent_id_string: string;
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
    post: PostMinimalResponse['post'];
    comment: PostMinimalResponse['post'];
}