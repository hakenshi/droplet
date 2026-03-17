export interface IAuthService {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  register(userData: RegisterData): Promise<AuthResponse>;
}

export interface ITokenStorage {
  store(token: string, user: User): Promise<{ status: number }>;
  get(): Promise<string | null>;
  remove(): Promise<void>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  name?: string;
}