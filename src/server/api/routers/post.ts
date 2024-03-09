import { createTRPCRouter, privateProcedure, publicProcedure } from "@/server/api/trpc";
import { type User, clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const filterUsers = (user: User) => {
  return { id: user.id, name: `${user.firstName} ${user.lastName}`, username: user.username ?? 'anon', email: user.emailAddresses[0], profileImageUrl: user.imageUrl }
}

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100
      })
    ).map(filterUsers);

    return posts.map(post => {
      const author = users.find(user => user.id === post.authorId);
      if (!author) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Author not found" });
      return {
        post,
        author
      }
    });
  }),

  create: privateProcedure
    .input(z.object({ content: z.string().emoji().min(1).max(255) }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.create({
        data: {
          authorId: ctx.currentUser,
          content: input.content,
        }
      });

      return post;
    })
});
