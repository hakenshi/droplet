interface SuccessResponse {
  user: User
  token: string
}

interface AuthError{
    email?: string[]
    password?: string[]
    username: string[]
    name: string[]
    surname: string[]
  }

type AuthResponse = SuccessResponse & ApiErrorResponse<AuthError>;
