'use client';
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import LoadingSpinner, { LoadingButton } from "./Loading";
import { api } from "@/trpc/react";
import { useState } from "react";

export default function CreatePostWizard() {
  const { isSignedIn, user, isLoaded: userLoaded } = useUser();
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const ctx = api.useUtils();

  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.post.getAll.invalidate();
    },
    onError: (error) => {
      setError(error.message)
    }
  });


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
          <form
            className="bg-transparent text-lg h-full w-full flex items-center"
            onSubmit={e => {
              e.preventDefault();
              setError('');
              mutate({ content: input });
            }}
          >
            <input
              type="text"
              placeholder="Type some emojis"
              className="bg-transparent text-lg px-2 py-1 w-full outline-none placeholder:text-muted-dark"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={isPosting}
            />
          </form>
        </div>
        {!userLoaded ? <LoadingButton /> :
          <div className="py-2 px-3 me-2 text-sm text-white bg-black rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 inline-flex items-center">
            {!isSignedIn && <SignInButton />}
            {isSignedIn && <SignOutButton />}
          </div>
        }
      </div>
      {error !== "" && <div className="text-sm text-red-500">
        {error}
      </div>
      }
    </div>
  )
}
