import { ITokenStorage } from '../interfaces/auth.interface';
import { createSession, deleteSession } from '@/utils/session';

export class TokenStorageService implements ITokenStorage {
  async store(token: string, user: User): Promise<{ status: number }> {
    try {
      await createSession(token, user);
      return { status: 200 };
    } catch (error) {
      return { status: 500 };
    }
  }

  async get(): Promise<string | null> {
    // Implementation depends on your session management
    return null;
  }

  async remove(): Promise<void> {
    await deleteSession();
  }
}