"use server"

import { PrismaClient } from "@prisma/client"
import { getDbUserId } from "./user.action"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

const prisma = new PrismaClient()

export async function getProfileByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        image: true,
        location: true,
        website: true,
        createdAt: true,
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    })

    return user
  } catch (error) {
    console.error("Error in getProfileByUsername", error)
    throw new Error("Failed to fetch profile")
  }
}

export async function getUserPosts(userId: string) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return posts
  } catch (error) {
    console.error("Error in getUserPosts", error)
    throw new Error("Failed to fetch user posts")
  }
}

export async function getUserLikedPosts(userId: string) {
  try {
    const likedPosts = await prisma.post.findMany({
      where: {
        likes: {
          some: {
            userId,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return likedPosts
  } catch (error) {
    console.error("Error in getUserLikedPosts", error)
    throw new Error("Failed to fetch liked posts")
  }
}

export async function updateProfile(formData: FormData) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) throw new Error("Unauthorized")

    const name = formData.get("name") as string
    const bio = formData.get("bio") as string
    const location = formData.get("location") as string
    const website = formData.get("website") as string

    const user = await prisma.user.update({
      where: { clerkId },
      data: {
        name,
        bio,
        location,
        website,
      },
    })

    revalidatePath("/profile")
    return { success: true, user }
  } catch (error) {
    console.error("Error in updateProfile", error)
    return { success: false, error: "Failed to update profile" }
  }
}

export async function isFollowing(userId: string) {
  try {
    const currentUserId = await getDbUserId()
    if (!currentUserId) return false

    const follow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: userId,
        },
      },
    })

    return !!follow
  } catch (error) {
    console.error("Error in isFollowing", error)
    return false
  }
}
