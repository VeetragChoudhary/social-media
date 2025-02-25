import { getPosts } from "@/actions/post.action"
import { getDbUserId } from "@/actions/user.action"
import CreatePost from "@/components/CreatePost"
import PostCard from "@/components/PostCard"
import { currentUser } from "@clerk/nextjs/server"
import { Toaster } from "react-hot-toast"

export default async function Home() {

  // const user = await currentUser()

  // const posts = await getPosts()   

  // const dbUserId = await getDbUserId()

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8">
        <CreatePost />
        <div className="flex gap-5 flex-col my-5">
{/*           
          {
            posts.map((post) => (
              <PostCard post={post} />
            ))  
          } */}

        </div>
      </div>
      <Toaster />
    </div>
  )
}
