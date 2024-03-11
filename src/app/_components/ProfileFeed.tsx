'use client';
import { api } from "@/trpc/react"
import LoadingSpinner from "./Loading";
import PostView from "./PostView";

export default function ProfileFeed({ userId }: { userId: string }) {
  const { data, isLoading } = api.post.getPostByUserId.useQuery({ userId });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center"><LoadingSpinner size={30} /></div>
    )
  }

  if (!data) {
    return (
      <div className="w-full flex justify-center">No Posts yet.</div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      {data.map((fullPost) => (
        <PostView key={fullPost.post.id} { ...fullPost } />
      ))}
    </div>
  )
}
