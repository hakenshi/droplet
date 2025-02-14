'use client'

import PostHeader from './post-header'
import PostContent from './post-content'
import PostFooter from './post-footer'
import PostContainer from './post-container'

interface PostProps {
    author: User
    post: PostSuccessResponse['post'],
    user: User
}

export default function Post({ author, post, user }: PostProps) {
    return (
        <PostContainer postId={post.id}>
            <PostHeader author={author} post={post} />
            <PostContent post={post} />
            <PostFooter user={user} post={post} />
        </PostContainer>
    )
}
