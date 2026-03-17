import React from 'react'
import { getPost, getPostComments } from './action'
import PostHeader from '@/components/posts/post-header'
import PostContent from '@/components/posts/post-content'
import PostFooter from '@/components/posts/post-footer'
import { getAuthUser } from '@/utils/getAuthUser'
import CommentForm from '@/components/comment/comment-form'
import Comment from '@/components/comment/comment'
import { Card, CardContent } from '@/components/ui/card'
import { MessageCircleOff } from 'lucide-react'

export default async function PostPage({ params }: { params: { id: string } }) {
    const { id } = await params

    const { post, author } = await getPost(id)

    const { user } = await getAuthUser()


    const { comments } = await getPostComments(post.id_string)

    return (
        <div className='p-5 h-screen overflow-scroll pb-20 no-scroll-bar'>
            <Card>
                <CardContent className=''>
                    <PostHeader user={user} hasBackButton={true} author={author} post={post} />
                    <PostContent post={post} />
                    <PostFooter user={user} post={post} />

                    {/* <div className="border-y">
                        <div className='px-10 py-5'>
                            <PostHeader hasOptionsButton={false} user={user} author={author} post={post} />
                            <CommentForm postId={id} userId={user.id} />
                        </div>
                    </div> */}
                    
                    <div className='p-5 border-t'>
                        <h2 className='text-xl text-zinc-800'>Comentários</h2>
                        {comments && comments.length > 0 ? comments.map(({ comment, author }, index) => (
                            <Comment user={user} key={index} author={author} comment={comment} />
                        )) : (<div className='flex  flex-col items-center gap-5'>
                            <MessageCircleOff className='text-zinc-500' />
                            <p className='text-zinc-500 text-sm'>Ainda não há comentários.</p>
                        </div>)}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
