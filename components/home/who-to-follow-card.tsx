import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FollowCard from "@/components/home/follow-card";
import { User } from "@/lib/definitions";

export default function WhoToFollowCard({ users }: { users: User[] }) {
  return (
    <Card className="w-full shadow-lg shadow-black/20">
      <CardHeader>
        <CardTitle>Who to follow</CardTitle>
        <CardDescription>Follow fellow devs like you.</CardDescription>
      </CardHeader>
      <CardContent className="flex w-full max-w-lg flex-col gap-2">
        {users?.map((user) => (
          <FollowCard key={user?.id} user={user} />
        ))}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant={"link"} className="w-full">
          View All
        </Button>
      </CardFooter>
    </Card>
  );
}
