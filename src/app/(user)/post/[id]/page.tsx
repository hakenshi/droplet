import React from 'react'
import { getPost } from './action'

export default async function PostPage({ params }: { params: { id: string } }) {
    const { id } = await params

    const {post} = await getPost(parseInt(id))

    console.log(post)

    return (
        <h1>{id}</h1>
    )
}
