import { IAuthService, LoginCredentials, RegisterData } from '../interfaces/auth.interface';
import { apiRequest } from '../api-client';
import { getAuthUser } from '@/utils/getAuthUser';

export class AuthService implements IAuthService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>(`${this.baseUrl}/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response.data!;
  }

  async logout(): Promise<void> {
    const { token } = await getAuthUser();
    
    const response = await apiRequest(`${this.baseUrl}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.error) {
      throw new Error(response.error);
    }
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>(`${this.baseUrl}/register`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response.data!;
  }
}