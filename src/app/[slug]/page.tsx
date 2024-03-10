import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile"
}

export default function ProfilePage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="w-full min-h-screen max-w-2xl border-x border-x-white/30">
        Profile View
      </div>
    </main>
  )
}
