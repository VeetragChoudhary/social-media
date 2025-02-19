import CreatePost from "@/components/CreatePost"
import PostCard from "@/components/PostCard"

export default function Home() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8 border border-red-500">
        <CreatePost />
        <div className="my-5">
          <PostCard />
        </div>
      </div>
    </div>
  )
}
