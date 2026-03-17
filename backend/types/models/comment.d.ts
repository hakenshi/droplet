interface Comment {
    id: number;
    user_id: number;
    post_id: number;
    parent_id: number | null;
    content: string;
    created_at: string;
    updated_at: string;
}