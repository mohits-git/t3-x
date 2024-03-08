import { api } from "@/trpc/server";
export default async function Pages() {
  const data = await api.post.getAll.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="py-6 px-4 bg-black/10 border border-white/5 rounded-2xl w-full max-w-xl">
          {data?.map((post: { id: string, content: string }) => (
            <div key={post.id}
              className="p-4 bg-black/20 border border-white/10 rounded-xl text-center"
            >{post.content}</div>
          ))}
        </div>

      </div>
    </main>
  )

}
