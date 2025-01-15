interface SuccessResponse {
  user: User
  token: string
}

interface LoginError{
    email?: string[]
    password?: string[]
  }

type LoginResponse = SuccessResponse & ApiErrorResponse<LoginError>;
