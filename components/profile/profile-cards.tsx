import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/lib/definitions";
type ProfileCardsProps = {
  currentUser: User;
  noOfBlogs: number;
  noOfFollowings: number;
  noOfFollowers: number;
};

export function ProfileCards({
  currentUser,
  noOfBlogs,
  noOfFollowings,
  noOfFollowers,
}: ProfileCardsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 place-items-center">
      <Card className="shadow-sm shadow-black/40 hover:scale-101 transition-transform duration-200 w-70">
        <CardHeader>
          <CardTitle>Blogs</CardTitle>
          <CardDescription>All your blogs</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-blue-400 text-xl font-bold">{noOfBlogs}</p>
        </CardContent>
      </Card>
      <Card className="shadow-sm shadow-black/40 hover:scale-101 transition-transform duration-200 w-70">
        <CardHeader>
          <CardTitle>Followers</CardTitle>
          <CardDescription>All your followers</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 text-xl font-bold">{noOfFollowers}</p>
        </CardContent>
      </Card>
      <Card className="shadow-sm shadow-black/40 hover:scale-101 transition-transform duration-200 w-70">
        <CardHeader>
          <CardTitle>Following</CardTitle>
          <CardDescription>All your following</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-amber-400 text-xl font-bold">{noOfFollowings}</p>
        </CardContent>
      </Card>
      <Card className="shadow-sm shadow-black/40 hover:scale-101 transition-transform duration-200 w-70">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your dev profile</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-green-400 text-xl font-bold">
            {currentUser?.name || ""}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
