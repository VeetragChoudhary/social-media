"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Loader, User } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { createPost } from "@/actions/post.action"
import toast from "react-hot-toast"

const CreatePost = () => {
  const [postContent, setPostContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsLoading(true)

      if (!postContent) return "Content is required"

      const result = await createPost(postContent, "url")

      if (result?.success) toast.success("Post Created")
    } catch (error) {
      console.log("Error while creating post", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <div className="flex px-3 py-4 gap-3">
        <User />

        <Textarea
          className="min-h-[100px] border-none outline-none"
          placeholder="What's on your mind?"
          onChange={(e) => setPostContent(e.target.value)}
          value={postContent}
        />
      </div>

      <div className="flex justify-end py-2 px-2">
        <Button onClick={handleSubmit}>Post</Button>
      </div>
    </Card>
  )
}

export default CreatePost
