import { IPostService, CreatePostData } from '../interfaces/post.interface';
import { apiRequest } from '../api-client';
import { getAuthUser } from '@/utils/getAuthUser';

export class PostService implements IPostService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;

  private async getAuthHeaders() {
    const { token } = await getAuthUser();
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  async getAllPosts(): Promise<PostSuccessResponse[]> {
    const headers = await this.getAuthHeaders();
    const response = await apiRequest<{ data: PostSuccessResponse[] }>(`${this.baseUrl}/posts/index`, {
      headers,
    });
    
    if (response.error) {
      throw new Error(response.error);
    }

    return response.data!.data;
  }

  async createPost(data: CreatePostData): Promise<PostSuccessResponse> {
    const authHeaders = await this.getAuthHeaders();
    const formData = new FormData();
    formData.append('content', data.content);
    
    if (data.donation_goal) {
      formData.append('donation_goal', data.donation_goal.toString());
    }

    if (data.images) {
      data.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    const response = await apiRequest<PostSuccessResponse>(`${this.baseUrl}/posts/store`, {
      method: 'POST',
      body: formData,
      headers: authHeaders,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response.data!;
  }

  async likePost(postId: number): Promise<LikeResponse> {
    const headers = await this.getAuthHeaders();
    const response = await apiRequest<LikeResponse>(`${this.baseUrl}/posts/like`, {
      method: 'POST',
      body: JSON.stringify({ post_id: postId }),
      headers,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response.data!;
  }

  async deletePost(postId: number): Promise<void> {
    const headers = await this.getAuthHeaders();
    const response = await apiRequest(`${this.baseUrl}/posts/${postId}`, {
      method: 'DELETE',
      headers,
    });

    if (response.error) {
      throw new Error(response.error);
    }
  }
}