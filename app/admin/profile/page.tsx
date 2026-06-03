import { getUser } from "@/app/lib/dal";
import AdminProfile from "@/components/admin/admin-profile";
import {
  fetchMultipleUsersById,
  fetchUserBlogs,
  fetchUserFollowers,
  fetchUserFollows,
} from "@/lib/data";
import { User } from "@/lib/definitions";
import { extractSimilarItemsFromArrayObj } from "@/utils/helpers";

export default async function ProfilePage() {
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
    <AdminProfile
      followers={followersData as User[]}
      followings={followingsData as User[]}
      currentUser={currentUser as User}
      noOfBlogs={blogs.length}
      noOfFollowings={followings.length}
      noOfFollowers={followers.length}
    />
  );
}
