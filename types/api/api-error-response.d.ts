interface ApiErrorResponse<T> {
    errors: T
    message: string
}

interface ApiSuccessResponse<T>{
    data: T
}