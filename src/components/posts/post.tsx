'use client'

import PostHeader from './post-header'
import PostContent from './post-content'
import PostFooter from './post-footer'
import PostContainer from './post-container'

interface PostProps {
    author: User
    post: PostSuccessResponse['post']
}

export default function Post({ author, post }: PostProps) {

    return (
        <PostContainer>
            <PostHeader author={author} post={post} />
            <PostContent post={post} />
            <PostFooter post={post} />
        </PostContainer>
    )
}
