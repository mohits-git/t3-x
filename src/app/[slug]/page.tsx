import { type Metadata } from "next";
import ProfileView from "../_components/ProfileView";
import ProfileFeed from "../_components/ProfileFeed";
// import { createServerSideHelpers } from '@trpc/react-query/server';
// import superjson from 'superjson';
// import { type GetServerSidePropsContext } from "next";
// import { appRouter } from '@/server/api/root';
// import { createTRPCContext } from '@/server/api/trpc';
// import { TRPCError } from '@trpc/server';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  return {
    title: `Profile (@${slug})`,
  }
}

type Props = {
  params: {
    slug: string,
  },
}

export default function ProfilePage(
  { params }: Props
) {
  const { slug } = params;
  return (
    <>
      <ProfileView userId={slug} />
      <ProfileFeed userId={slug} />
    </>
  )
}


// we don' t need all these prefetching pain, this was only needed in page router but not in app router

// export async function getStaticProps(
//   context: GetServerSidePropsContext<{ slug: string }>,
// ) {
//   const helpers = createServerSideHelpers({
//     router: appRouter,
//     ctx: await createTRPCContext({ headers: new Headers() }),
//     transformer: superjson,
//   });
//
//   const userId = context.params?.slug;
//
//   if (!userId) throw new TRPCError({ code: "BAD_REQUEST" })
//
//   await helpers.profile.getProfile.prefetch({ userId });
//
//   return {
//     props: {
//       trpcState: helpers.dehydrate(),
//       userId,
//     }
//   }
//
// }
//
// export async function generateStaticParams() {
//   return [ { slug: 'user_2dKDooyqqMF1nAyXfBiaTDbHSV8' }];
// }
//
// // export const getStaticPaths = () => {
// //   return {
// //     paths: [], fallback: "blocking",
// //   }
// // }
