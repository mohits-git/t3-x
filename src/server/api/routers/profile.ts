import { type User, clerkClient } from "@clerk/nextjs/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { filterUser } from "@/server/utils";

export const profileRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const user: User = await clerkClient.users.getUser(input.userId);
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: `can not find the user profile with userId: ${input.userId}` })
      }

      return filterUser(user);
    }),
})
