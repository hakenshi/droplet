interface SuccessResponse {
  user: User
  token: string
}

interface AuthError{
    email?: string[]
    password?: string[]
    username: string[]
  }

type AuthResponse = SuccessResponse & ApiErrorResponse<AuthError>;
