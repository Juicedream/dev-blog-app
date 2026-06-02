import { getUser } from "@/app/lib/dal";
import UserProfileComponent from "@/components/user/user-profile";
import {
  fetchUserBlogs,
  fetchUserFollowers,
  fetchUserFollows,
} from "@/lib/data";
import type { User } from "@/lib/definitions";

export default async function UserProfile() {
  const currentUser = await getUser();
  const blogs = await fetchUserBlogs(currentUser?.id);
  const followings = await fetchUserFollows(currentUser?.id);
  const followers = await fetchUserFollowers(currentUser?.id);

  return (
    <UserProfileComponent
      noOfBlogs={blogs.length}
      noOfFollowers={followers.length}
      noOfFollowings={followings.length}
      currentUser={currentUser as User}
    />
  );
}
