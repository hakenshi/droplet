interface ApiErrorResponse<T> {
    errors: T
    message: string
}

interface ApiSucessReponse<T>{
    data: T
}