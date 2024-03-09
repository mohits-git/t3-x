'use client';
import { api } from "@/trpc/react"
import { LoadingPage } from "./Loading";
import PostView from "./PostView";

export default function Feed() {
  const { data, isLoading } = api.post.getAll.useQuery();

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    )
  }

  if (!data) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="w-full flex flex-col">
      {data?.map((fullpost) => (
        <PostView key={fullpost.post.id} {...fullpost} />
      ))}
    </div>
  )
}
