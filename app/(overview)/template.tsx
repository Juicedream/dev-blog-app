import { ReactNode } from "react";

import WhoToFollowCard from "@/components/home/who-to-follow-card";

import { fetchUserFollows, usersToFollow } from "@/lib/data";
import { getUser } from "@/app/lib/dal";
import { User } from "@/lib/definitions";
import { extractSimilarItemsFromArrayObj } from "@/utils/helpers";

export default async function Template({ children }: { children: ReactNode }) {
  const currentUser = (await getUser()) ?? null;
  const users = (currentUser && (await usersToFollow(currentUser?.id))) || [];
  const allFollowing =
    (currentUser && (await fetchUserFollows(currentUser?.id))) || [];
  const extractedFollowersId =
    (allFollowing &&
      (extractSimilarItemsFromArrayObj(
        "follower_id",
        allFollowing,
      ) as string[])) ||
    [];

  const link = `/${currentUser?.role}/devs` as string;
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex flex-col md:flex-row justify-between my-4 md:my-6 md:mx-6 mx-2 md:gap-8 gap-10">
        <div className="w-full">{children}</div>
        {currentUser && (
          <aside className="shrink-0 hidden md:block w-100 rounded-2xl">
            <WhoToFollowCard
              users={users as User[]}
              viewAllLink={link}
              currentUser={currentUser as User}
              followings={extractedFollowersId}
            />
          </aside>
        )}
      </div>
    </div>
  );
}
