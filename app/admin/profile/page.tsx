import { getUser } from "@/app/lib/dal";
import AdminProfile from "@/components/admin/admin-profile";
import {
  fetchUserBlogs,
  fetchUserFollowers,
  fetchUserFollows,
} from "@/lib/data";
import { User } from "@/lib/definitions";

export default async function ProfilePage() {
  const currentUser = await getUser();
  const blogs = await fetchUserBlogs(currentUser?.id);
  const followings = await fetchUserFollows(currentUser?.id);
  const followers = await fetchUserFollowers(currentUser?.id);
  return (
    <AdminProfile
      currentUser={currentUser as User}
      noOfBlogs={blogs.length}
      noOfFollowings={followings.length}
      noOfFollowers={followers.length}
    />
  );
}
