'use client';
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";

export default function Auth() {
    const user = useUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      {!user.isSignedIn && <SignInButton />}
       {!!user.isSignedIn && <UserButton />}
        
      </div>
    </main>
  );
}

