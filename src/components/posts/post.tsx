'use client'

import PostHeader from './post-header'
import PostContent from './post-content'
import PostFooter from './post-footer'
import PostContainer from './post-container'
import Link from 'next/link'
import CommentHeader from '../comment/comment-header'

interface PostProps {
    author: User
    post: PostSuccessResponse['post'],
    user: User
}

export default function Post({ author, post, user }: PostProps) {

    return (
        <PostContainer postId={post.id}>
            <PostHeader user={user} author={author} post={post} />
            <Link href={`/post/${post.post_redirect_id ?? post.id_string}`}>
                <PostContent post={post} />
            </Link>
            <PostFooter user={user} post={post} />
        </PostContainer>
    )
}
