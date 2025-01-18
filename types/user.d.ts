interface User{
    id: int
    cover_image: string
    profile_image: string
    username: string
    name: string | null
    surname: string | null
    email: string
    bio: string
    birth_date: Date
    password: string
    remember_token: string | null
    created_at: Date
    updated_at: Date
}