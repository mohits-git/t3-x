'use client';
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
export default function CreatePostWizard() {
  const user = useUser();
  if (!user) return null;
  return (
    <div className="w-full h-full flex items-center justify-between gap-x-2">
      <div className="flex gap-3 w-[80%]">
        <div className="rounded-full w-10 h-10 overflow-hidden shrink-0">
          <img
            src={user.user?.imageUrl ?? "/favicon.ico"}
            alt="User profile"
            className="w-full h-full"
          />
        </div>
        <input type="text" placeholder="Type some emojis" className="bg-transparent px-2 py-1 w-full outline-none" />
      </div>
      <div className="shrink-0">
        {!user.isSignedIn && <SignInButton />}
        {user.isSignedIn && <SignOutButton />}
      </div>
    </div>
  )
}
