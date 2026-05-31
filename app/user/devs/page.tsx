import { getUser } from "@/app/lib/dal";
import FollowCard from "@/components/home/follow-card";
import { fetchAllDevs, fetchUserFollows } from "@/lib/data";
import { User } from "@/lib/definitions";
import { extractSimilarItemsFromArrayObj } from "@/utils/helpers";

export default async function Devs() {
  const currentUser = await getUser();
  const devs = await fetchAllDevs(currentUser?.id);
  const allFollowing = (await fetchUserFollows(currentUser?.id)) ?? [];
  const extractedFollowersId = extractSimilarItemsFromArrayObj(
    "follower_id",
    allFollowing,
  ) as string[];
  if (devs.length < 1) {
    return (
      <div className="flex flex-col items-center w-full justify-center">
        <p className="text-muted-foreground mt-3 text-xl">No Devs Found</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center w-full justify-center gap-5">
      <p className="mr-auto text-xl font-bold">All Devs</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center gap-4 w-full">
        {devs.map((dev) => {
          const following = extractedFollowersId.includes(dev?.id);
          return (
            <FollowCard
              key={dev.id}
              user={dev}
              currentUser={currentUser as User}
              following={following}
            />
          );
        })}
      </div>
    </div>
  );
}
