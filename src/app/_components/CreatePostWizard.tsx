'use client';
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import LoadingSpinner, { LoadingButton } from "./Loading";

export default function CreatePostWizard() {
  const { isSignedIn, user, isLoaded: userLoaded } = useUser();
  return (
    <div className="border-b border-b-white/20 p-4">
      <div className="w-full h-full flex items-center justify-between gap-x-2">
        <div className="flex gap-3 w-[80%]">
          <div className="rounded-full max-w-10 max-h-10 overflow-hidden shrink-0">
            {!userLoaded ? <LoadingSpinner size={30} /> :
              <Image
                src={user?.imageUrl ?? "/favicon.ico"}
                alt="User Profile Picture"
                width={40}
                height={40}
              />
            }
          </div>
          <input type="text" placeholder="Type some emojis" className="bg-transparent px-2 py-1 w-full outline-none placeholder:text-muted-dark" />
        </div>
        {!userLoaded ? <LoadingButton /> :
          <div className="py-2 px-3 me-2 text-sm text-white bg-black rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 inline-flex items-center">
            {!isSignedIn && <SignInButton />}
            {isSignedIn && <SignOutButton />}
          </div>
        }
      </div>
    </div>
  )
}
