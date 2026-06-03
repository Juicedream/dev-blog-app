import { getUser } from "@/app/lib/dal";
import UserProfileComponent from "@/components/user/user-profile";
import {
  fetchMultipleUsersById,
  fetchUserBlogs,
  fetchUserFollowers,
  fetchUserFollows,
} from "@/lib/data";
import type { User } from "@/lib/definitions";
import { extractSimilarItemsFromArrayObj } from "@/utils/helpers";

export default async function UserProfile() {
  const currentUser = await getUser();
  const blogs = await fetchUserBlogs(currentUser?.id);
  const followings = await fetchUserFollows(currentUser?.id);
  const followers = await fetchUserFollowers(currentUser?.id);
  const followersData = await fetchMultipleUsersById([
    ...extractSimilarItemsFromArrayObj("following_id", followers),
  ] as string[]);
  const followingsData = await fetchMultipleUsersById([
    ...extractSimilarItemsFromArrayObj("follower_id", followings),
  ] as string[]);

  return (
    <UserProfileComponent
      followers={followersData as User[]}
      followings={followingsData as User[]}
      noOfBlogs={blogs.length}
      noOfFollowers={followers.length}
      noOfFollowings={followings.length}
      currentUser={currentUser as User}
    />
  );
}
