"use server"

import prisma from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

// const prisma = new PrismaClient()

export async function syncUser() {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) return

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    })

    if (existingUser) return existingUser

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    })

    return dbUser
  } catch (error) {
    console.log("Error in syncUser", error)
  }
}

export async function getUserDataByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
  })
}

export async function getDbUserId() {
  const { userId: clerkId } = await auth()
  if (!clerkId) return null

  const user = await getUserDataByClerkId(clerkId)

  if (!user) throw new Error("User not found")

  return user.id
}

export async function toggleFollow(targetUserId: string) {
  try {
    const userId = await getDbUserId()

    if (!userId) return

    if (userId === targetUserId) throw new Error("You cannot follow yourself")

    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: targetUserId,
        },
      },
    })

    if (existingFollow) {
      // unfollow
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: targetUserId,
          },
        },
      })
    } else {
      // follow
      await prisma.$transaction([
        prisma.follows.create({
          data: {
            followerId: userId,
            followingId: targetUserId,
          },
        }),

        prisma.notification.create({
          data: {
            type: "FOLLOW",
            userId: targetUserId, // user being followed
            creatorId: userId, // user that is following
          },
        }),
      ])
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.log("Error in toggleFollow", error)
    return { success: false, error: "Error toggling follow" }
  }
}
