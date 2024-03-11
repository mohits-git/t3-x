import PostView from "@/app/_components/PostView";
import { api } from "@/trpc/server";
import { type Metadata } from "next";

type Props = {
  params: {
    id: string,
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const data = await api.post.getPostById.query({ postId: id });

  if (!data) {
    return {
      title: "Post Not Found"
    }
  }
  return {
    title: `${data.post.content} | @${data.author.username}`
  }
}

export default async function PostPage({ params }: Props) {
  const { id } = params;
  const data = await api.post.getPostById.query({ postId: id });

  if (!data) {
    return <div className="w-full flex justify-center">
      Could&apos;nt load the post
    </div>
  }

  return (
    <div className="w-full flex justify-center">
      <PostView {...data} />
    </div>
  )
}
