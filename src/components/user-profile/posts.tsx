import Post from '../post'

export default function Posts({user}:{user:User}) {

    return (
        Array.from({ length: 10 }).map((_, index) => (
            <Post user={user} key={index} />
        ))
    )
}
