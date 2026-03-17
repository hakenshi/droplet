interface ApiErrorResponse<T> {
    errors: T;
    message: string;
}

interface ApiSuccessResponse<T> {
    data: T;
    message?: string;
}

// Tipos base para paginação
interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
}

interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
}