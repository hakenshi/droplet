import { FrownIcon } from 'lucide-react'
import Post from './post'

interface PostProps {
    posts: PostSuccessResponse[]
}

export default function Posts({ posts }: PostProps) {

    console.log(posts)

    return (
        <div className='grid grid-cols-1 gap-7 px-3 pb-10'>
            {posts.length > 0 ? posts.map(({ author, post }, index) => (
                <Post author={author} post={post} key={index} />
            ))
                : (<div className='grid place-items-center gap-3 p-10 text-zinc-500'>
                    <FrownIcon size={30} />
                    Nenhum post encontrado
                </div>)}
        </div>
    )
}
