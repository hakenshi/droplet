import { HouseIcon } from "lucide-react";
import FeedCard from "./FeedCard/FeedCard";
import { getUsers } from "@/utils/user";
import { getAuthUser } from "@/utils/getAuthUser";
import { getAllPosts } from "./action";
import Post from "@/components/posts/post";

export default async function HomePage() {

  const { token, user } = await getAuthUser()
  const { users } = await getUsers(token)

  const { posts } = await getAllPosts()
  console.log(posts)

  return (
    <section className="flex flex-col items-start gap-8 overflow-auto py-5 px-5 ">
      <h1 className="flex items-center gap-2 text-2xl font-bold"><HouseIcon className="w-8 h-8" /> Feed</h1>

      <div className="flex flex-col items-center justity-center gap-10 w-full">
        {posts && posts.length > 0 ? posts.map((post, index) => <Post
          author={post.author}
          key={index}
          user={user}
          post={post.post} />) : <p>Nenhum post encontrado</p>}
      </div>

    </section>
  );
}
