'use client';
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import LoadingSpinner, { LoadingButton } from "./Loading";
import { api } from "@/trpc/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreatePostWizard() {
  const { isSignedIn, user, isLoaded: userLoaded } = useUser();
  const [input, setInput] = useState<string>("");

  const ctx = api.useUtils();

  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.post.getAll.invalidate();
    },
    onError: (error) => {
      const errorMessage = error.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error(error.message);
      }
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
              mutate({ content: input });
            }}
          >
            <input
              type="text"
              placeholder={!user ? "Signin to post your emojis" : "Type some emojis"}
              className="bg-transparent text-lg px-2 py-1 w-full outline-none placeholder:text-muted-dark"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={isPosting || !user}
            />
            {input !== "" && !isPosting &&
              (<button className="shrink-0 py-2 px-6 me-2 text-sm text-white bg-black rounded-lg inline-flex items-center">
                Post
              </button>)}

            {isPosting && <div className="flex justify-center items-center me-2 px-6 py-2 shrink-0 rounded-lg">
              <LoadingSpinner size={20} />
            </div>}

          </form>
        </div>
        {!userLoaded ? <LoadingButton /> :
          <div className="py-2 px-3 me-2 text-sm text-white bg-black rounded-lg border border-gray-200 inline-flex items-center">
            {!isSignedIn && <SignInButton />}
            {isSignedIn && <SignOutButton />}
          </div>
        }
      </div>
    </div>
  )
}
