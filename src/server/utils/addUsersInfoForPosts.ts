import { clerkClient } from "@clerk/nextjs/server";
import type { Post } from "@prisma/client";
import { filterUser } from ".";
import { TRPCError } from "@trpc/server";
export const addUsersInfoForPosts = async (posts: Post[]) => {
  const users = (
    await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId),
      limit: 100
    })
  ).map(filterUser);

  return posts.map(post => {
    const author = users.find(user => user.id === post.authorId);
    if (!author) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Author not found" });
    return {
      post,
      author
    }
  });
}

