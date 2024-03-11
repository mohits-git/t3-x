import { createTRPCRouter, privateProcedure, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { addUsersInfoForPosts, ratelimit } from "@/server/utils";

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

  getPostById: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({ where: { id: input.postId } });
      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return (await addUsersInfoForPosts([post]))[0];
    }),

  getPostByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: {
          authorId: input.userId
        },
        take: 50,
        orderBy: {
          createdAt: 'desc',
        },
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
