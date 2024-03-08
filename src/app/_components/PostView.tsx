import { type RouterOutputs } from "@/trpc/shared";
type PostWithUser = RouterOutputs["post"]["getAll"][number];

export default function PostView({ post, author }: PostWithUser) {
  return (
    <div className="p-6 w-full bg-white/5 border-y border-y-white/10 space-y-2">
      <div className="flex items-start space-x-3">
        <div className="rounded-full w-10 h-10 overflow-hidden shrink-0">
          <img
            src={author.profileImageUrl ?? "/favicon.ico"}
            alt="User profile"
            className="w-full h-full"
          />
        </div>
        <div>
          <div className="gap-2 flex">
            <span className="font-medium text-sm">{author.name}{` `}</span>
            <span className="text-sm text-gray-500">{`@${author.username}`}</span>
          </div>
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  )
}
