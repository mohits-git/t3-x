import { type User } from "@clerk/nextjs/server"

export const filterUser = (user: User) => {
  return { id: user.id, name: `${user.firstName} ${user.lastName}`, username: user.username ?? 'anon', email: user.emailAddresses[0], profileImageUrl: user.imageUrl }
}

