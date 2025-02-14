import React from 'react'
import { getPost } from './action'
import PostContainer from '@/components/posts/post-container'
import PostHeader from '@/components/posts/post-header'
import PostContent from '@/components/posts/post-content'
import PostFooter from '@/components/posts/post-footer'
import { getAuthUser } from '@/utils/getAuthUser'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import CommentForm from '@/components/comment/comment-form'

export default async function PostPage({ params }: { params: { id: string } }) {
    const { id } = await params

    const { post, author } = await getPost(parseInt(id))

    const { user } = await getAuthUser()

    return (
        <div className='p-5'>
            <PostContainer>
                <PostHeader hasBackButton={true} author={author} post={post} />
                <PostContent post={post} />
                <PostFooter user={user} post={post} />
                <div className="border-t">
                    <div className='px-10 pt-5'>
                        <div className='pb-5 flex text-zinc-700 text-sm items-center gap-2'>
                            <Avatar>
                                <AvatarImage src={"/avatar.png"} alt="avatar" />
                                <AvatarFallback className="bg-sky-500 text-white">
                                    {user.username.toUpperCase().substring(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='text-zinc-800'>{user.name ? `${user.name} ${user.surname}` : user.username}</p>
                                <p className='text-zinc-500 text-sm'>@{user.username}</p>
                            </div>
                        </div>
                        <CommentForm postId={parseInt(id)} userId={user.id} />
                    </div>
                    <div className='p-5'>
                        <h2 className='text-xl text-zinc-800'>Comentários</h2>
                        {/* {comments.map(({comment, author}, index) => (
                        <Post key={index} author={author} post={comment as unknown as PostSuccessResponse} />
                    ))} */}
                    </div>
                </div>
            </PostContainer>
        </div>
    )
}
