'use client';
import { api } from "@/trpc/react";
import LoadingSpinner from "./Loading";
import Image from "next/image";

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
    <div>
      <div className="w-full h-[25vh] relative overflow-hidden">
        <Image src={'/bannereyes.jpeg'} width={1000} height={500} alt={"Banner image"} className="-mt-[15%]" />
      </div>

      <div className="mx-5 -mt-20 absolute rounded-full w-36 h-36 bg-red-400 overflow-hidden border-4 border-black">
        <Image src={data.profileImageUrl} fill alt={`${data.name}'s profile image`} className="bg-black" />
      </div>

      <div className="h-20 "></div>

      <div className="px-4 flex flex-col border-b border-white/30 pb-6">
        <h2 className="text-white text-xl font-bold">{data.name}</h2>
        <h4 className="text-muted"><span className="text-sm">@</span>{data.username}</h4>

        <p className="mt-3 ">Building full stack projects with T3</p>

        <div className="text-muted mt-2 text-[15px] leading-5">
          <div className="flex justify-start space-x-2">
            <p className="flex items-center">
              <span className="mr-[3px]">
                <Image src={'/icons/location.svg'} width={20} height={20} alt="Location" />
              </span>
              NY, Paris
            </p>
            <a href="https://github.com/mohits-git" className="text-sky-500 flex items-center">
              <span className="mr-1">
                <Image src={'/icons/link.svg'} width={18} height={18} alt="link" />
              </span>
              github.com/mohits-git
            </a>
            <p className="flex items-center">
              <span >
                <Image src={'/icons/baloon.svg'} width={22} height={22} alt="Birth date" />
              </span>
              Born May 28, 2024
            </p>
          </div>
          <p className="flex items-center">
            <span className="mr-1">
              <Image src={'/icons/calendar.svg'} width={20} height={20} alt="Joined at" />
            </span>
            Joined Novemeber 2023
          </p>
        </div>

        <div className="text-muted mt-2 flex space-x-6">
          <p><span className="text-white font-medium">398</span><span>&nbsp;Following</span></p>
          <p><span className="text-white font-medium">99</span><span>&nbsp;Followers</span></p>
        </div>
      </div>

    </div>
  )
}
