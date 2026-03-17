export interface IPostService {
  getAllPosts(): Promise<PostSuccessResponse[]>;
  createPost(data: CreatePostData): Promise<PostSuccessResponse>;
  likePost(postId: number): Promise<LikeResponse>;
  deletePost(postId: number): Promise<void>;
}

export interface ICommentService {
  getComments(postId: number): Promise<CommentSuccessResponse[]>;
  createComment(data: CreateCommentData): Promise<CommentSuccessResponse>;
  likeComment(commentId: number): Promise<LikeResponse>;
}

export interface CreatePostData {
  content: string;
  donation_goal?: number;
  images?: File[];
}

export interface CreateCommentData {
  post_id: number;
  content: string;
  parent_id?: number;
}