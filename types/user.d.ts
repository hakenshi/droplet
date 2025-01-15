interface User{
    id: int
    username: string
    name: string | null
    surname: string | null
    email: string
    password: string
    remember_token: string | null
    created_at: Date
    updated_at: Date
}