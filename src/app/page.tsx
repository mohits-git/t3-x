import CreatePostWizard from "./_components/CreatePostWizard";
import Feed from "./_components/Feed";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="w-full min-h-screen max-w-2xl border-x border-x-white/30">
        <CreatePostWizard />
        <Feed />
      </div>
    </main>
  );
}
