import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Post"
}

export default function PostPage() {
    return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="w-full min-h-screen max-w-2xl border-x border-x-white/30">
        Post View
      </div>
    </main>
    )
  }
