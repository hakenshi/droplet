import React from 'react'
import { getPost, getPostComments, storeComment } from './action'
import PostContainer from '@/components/posts/post-container'
import PostHeader from '@/components/posts/post-header'
import PostContent from '@/components/posts/post-content'
import PostFooter from '@/components/posts/post-footer'
import ResizeableTextArea from '@/components/posts/resizeable-textarea'
import { getAuthUser } from '@/utils/getAuthUser'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CalendarIcon, ImageIcon } from 'lucide-react'
import Post from '@/components/posts/post'

export default async function PostPage({ params }: { params: { id: string } }) {
    const { id } = await params

    const { post, author } = await getPost(parseInt(id))

    const { user } = await getAuthUser()

    const { comments } = await getPostComments(parseInt(id))

    const submit = async (form: FormData) => {
        'use server'
        form.append('user_id', user.id)
        form.append('post_id', id)

        await storeComment(form)
    }

    return (
        <div className='p-5'>
            <PostContainer>
                <PostHeader hasBackButton={true} author={author} post={post} />
                <PostContent post={post} />
                <PostFooter post={post} />
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
                        <form action={submit} className='space-y-2'>
                            <ResizeableTextArea name='content' className='border-none focus:ring-0 focus:outline-none focus:border-none focus-visible:ring-0' placeholder='Drop sua resposta' />
                            <div className='flex justify-between items-center'>
                                <div>
                                    <button type='button'
                                        className='hover:bg-sky-500/10 p-2 rounded-full hover:text-sky-500 hover:cursor-pointer transition-colors'>
                                        <ImageIcon className='' />
                                    </button>
                                    <button type='button'
                                        className='hover:bg-sky-500/10 p-2 hover:cursor-pointer rounded-full hover:text-sky-500 transition-colors'>
                                        <CalendarIcon className='' />
                                    </button>
                                </div>
                                <Button type='submit'>
                                    Responder
                                </Button>
                            </div>
                        </form>
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
