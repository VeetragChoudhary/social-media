"use client"

import { Heart, User } from "lucide-react"
import { Card, CardContent } from "./ui/card"

const PostCard = (post: any) => {
  
  console.log(post)
  return (
    
      <Card>
        <CardContent className="flex flex-col py-5">
      
          <div className="flex gap-4 items-center">
            <div className="size-11 border rounded-full "><User className="size-10"/> </div>
            <p className="text-lg">{post.post.author.name}</p>           
            {/* <p>{post.post.createdAt}</p>            */}
          </div>

          <div>
            {post.post.content}
          </div>
          <div className="flex gap-5">
          
            <Heart/>
            <div>{post.post._count.comments}</div>
            <div>{post.post._count.likes}</div>
          </div>
        </CardContent>
      </Card>
    
  )
}

export default PostCard
