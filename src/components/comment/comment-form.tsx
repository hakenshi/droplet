'use client'

import { storeComment } from '@/app/(user)/post/[id]/action'
import React, { FormEvent } from 'react'
import ResizeableTextArea from '../posts/resizeable-textarea'
import { CalendarIcon, ImageIcon } from 'lucide-react'
import { Button } from '../ui/button'

export default function CommentForm({ postId, userId }: { postId: number, userId: number }) {

    const submit = async (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const form = Object.fromEntries(formData.entries()) as unknown as { post: string }
        await storeComment({ content: form.post, post_id: postId, user_id: userId })
    }

    return (
        <form onSubmit={submit} className='space-y-2'>
            <div>
                <ResizeableTextArea placeholder='Qual seu pensamento?' name={'post'} />
            </div>
            <div className='flex justify-between pt-2'>
                <div className='flex gap-2'>
                    <button type='button'
                        className='hover:bg-sky-500/10 p-2 rounded-full hover:text-sky-500 hover:cursor-pointer transition-colors'>
                        <ImageIcon className='' />
                    </button>
                    <button type='button' className='hover:bg-sky-500/10 p-2 hover:cursor-pointer rounded-full hover:text-sky-500 transition-colors'>
                        <CalendarIcon className='' />
                    </button>
                </div>
                <div>
                    <Button className='rounded-full' type='submit'>
                        Comentar
                    </Button>
                </div>
            </div>
        </form>
    )
}
