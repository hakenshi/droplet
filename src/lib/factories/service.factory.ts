import { IAuthService, ITokenStorage } from '../interfaces/auth.interface';
import { IPostService } from '../interfaces/post.interface';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { TokenStorageService } from '../services/token-storage.service';

export class ServiceFactory {
  private static authService: IAuthService;
  private static postService: IPostService;
  private static tokenStorage: ITokenStorage;

  static getAuthService(): IAuthService {
    if (!this.authService) {
      this.authService = new AuthService();
    }
    return this.authService;
  }

  static getPostService(): IPostService {
    if (!this.postService) {
      this.postService = new PostService();
    }
    return this.postService;
  }

  static getTokenStorage(): ITokenStorage {
    if (!this.tokenStorage) {
      this.tokenStorage = new TokenStorageService();
    }
    return this.tokenStorage;
  }
}