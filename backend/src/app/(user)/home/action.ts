"use server"

import { ServiceFactory } from "@/lib/factories/service.factory";
import { CreatePostData } from "@/lib/interfaces/post.interface";
import { revalidateTag } from "next/cache";

export async function getAllPosts(): Promise<{ posts: PostSuccessResponse[] }> {
    const postService = ServiceFactory.getPostService();
    
    try {
        const posts = await postService.getAllPosts();
        return { posts };
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export async function createPostAction(data: CreatePostData): Promise<PostSuccessResponse> {
    const postService = ServiceFactory.getPostService();
    
    try {
        const post = await postService.createPost(data);
        revalidateTag('posts');
        return post;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}

export async function likePostAction(postId: number): Promise<LikeResponse> {
    const postService = ServiceFactory.getPostService();
    
    try {
        const result = await postService.likePost(postId);
        revalidateTag('posts');
        return result;
    } catch (error) {
        console.error('Error liking post:', error);
        throw error;
    }
}

export async function deletePostAction(postId: number): Promise<void> {
    const postService = ServiceFactory.getPostService();
    
    try {
        await postService.deletePost(postId);
        revalidateTag('posts');
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}