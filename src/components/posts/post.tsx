'use client'

import PostHeader from './post-header'
import PostContent from './post-content'
import PostFooter from './post-footer'
import PostContainer from './post-container'
import Link from 'next/link'

interface PostProps {
    author: User
    post: PostSuccessResponse['post'],
    user: User
}

export default function Post({ author, post, user }: PostProps) {
    return (
        <PostContainer postId={post.id}>
            <PostHeader author={author} post={post} />
            <Link href={`/post/${post.id}`}>
                <PostContent post={post} />
            </Link>
            <PostFooter user={user} post={post} />
        </PostContainer>
    )
}
