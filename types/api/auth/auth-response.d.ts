type AuthSuccessResponse = {
  user: User
  token: string
}

type AuthErrorResponse = {
  email?: string[]
  password?: string[]
  username: string[]
  name: string[]
  surname: string[]
}

type AuthResponse = ApiSucessReponse<AuthSuccessResponse> | ApiErrorResponse<AuthErrorResponse>;

