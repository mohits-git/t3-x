import { api } from "@/trpc/server";
import CreatePostWizard from "./_components/CreatePostWizard";
import PostView from "./_components/PostView";

export default async function Home() {
  const data = await api.post.getAll.query();

  if (!data) return <div>Loading...</div>;

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="w-full h-screen max-w-2xl border-x border-x-white/30">
        <div className="border-b border-b-white/20 p-4">
          <CreatePostWizard />
        </div>
        <div className="w-full flex flex-col">
          {data?.map((fullpost) => (
            <PostView key={fullpost.post.id} {...fullpost} />
          ))}
        </div>
      </div>
    </main>
  );
}


