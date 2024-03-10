'use client';
import { api } from "@/trpc/react";
import LoadingSpinner from "./Loading";

export default function ProfileView({ userId }: { userId: string }) {
  const { data, isLoading } = api.profile.getProfile.useQuery({ userId });

  if (isLoading) {
    return (
      <div className="flex justify-center w-full h-full">
        <LoadingSpinner />
      </div>
    )
  }

  if (!data)
    return (
      <div className="flex justify-center w-full h-full">
        User Not Found
      </div>
    )

  return (
    <div className="flex justify-center w-full h-full">
      <span className="text-white text-lg font-medium text-center">{data.name}</span>
    </div>
  )
}
