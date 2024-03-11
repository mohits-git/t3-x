import { createTRPCRouter, privateProcedure, publicProcedure } from "@/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { filterUser } from "@/server/utils";

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis"; // see below for cloudflare and fastly adapters
import type { Post } from "@prisma/client";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
});


const addUsersInfoForPosts = async (posts: Post[]) => {
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

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return await addUsersInfoForPosts(posts);
  }),

  getPostByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: {
          authorId: input.userId
        }
      });

      return await addUsersInfoForPosts(posts);
    }),

  create: privateProcedure
    .input(z.object({ content: z.string().emoji("Only Emojis are allowed").min(1).max(255) }))
    .mutation(async ({ ctx, input }) => {

      const { success } = await ratelimit.limit(ctx.currentUser);

      if (!success) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "You can only post 3 times with in a minute." })
      }

      const post = await ctx.db.post.create({
        data: {
          authorId: ctx.currentUser,
          content: input.content,
        }
      });

      return post;
    })
});
