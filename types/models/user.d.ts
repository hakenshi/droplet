interface User {
    id: number;
    cover_image: string | null;
    profile_image: string | null;
    username: string;
    name: string | null;
    surname: string | null;
    email: string;
    bio: string | null;
    birth_date: string | null;
    password?: string;
    remember_token?: string | null;
    created_at: string;
    updated_at?: string;
}