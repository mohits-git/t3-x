import { type RouterOutputs } from "@/trpc/shared";
type PostWithUser = RouterOutputs["post"]["getAll"][number];

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";

dayjs.extend(relativeTime);

export default function PostView({ post, author }: PostWithUser) {
  return (
    <div className="p-6 w-full bg-white/5 border-y border-y-white/10 space-y-2">
      <Link href={`/post/${post.id}`}>
        <div className="flex items-start space-x-3">
          <Link href={`/${author.id}`}>
            <div className="rounded-full max-w-10 max-h-10 overflow-hidden shrink-0">
              <Image
                src={author.profileImageUrl ?? "/favicon.ico"}
                alt={`@${author.username}'s profile picture`}
                width={40}
                height={40}
              />
            </div>
          </Link>
          <div>
            <div className="gap-1 flex text-sm text-muted">
              <Link href={`/${author.id}`}>
                <span className="font-medium text-white">{author.name}</span>
              </Link>
              <Link href={`/${author.id}`}>
                <span>{`@${author.username}`}</span>
              </Link>
              <span>{`·`}</span>
              <span>{dayjs(post.createdAt).fromNow()}</span>
            </div>
            <p>{post.content}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
