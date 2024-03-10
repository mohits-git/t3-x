import { type Metadata } from "next";
import ProfileView from "../_components/ProfileView";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Profile",
  }
}

type Params = {
  params: {
    slug: string,
  },
}

export default function ProfilePage({ params }: Params) {
  const { slug } = params;

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="w-full min-h-screen max-w-2xl border-x border-x-white/30">
        <ProfileView userId={slug}/>
      </div>
    </main>
  )
}
