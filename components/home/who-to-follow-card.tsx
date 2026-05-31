import Link from "next/link";
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

export default function WhoToFollowCard({
  users,
  viewAllLink,
}: {
  users: User[];
  viewAllLink: string;
}) {
  return (
    <Card className="w-full shadow-lg shadow-black/20">
      <CardHeader>
        {users.length > 1 ? (
          <>
            <CardTitle>Who to follow</CardTitle>
            <CardDescription>Follow fellow devs like you.</CardDescription>
          </>
        ) : (
          <CardTitle className="text-center">No Devs Found</CardTitle>
        )}
      </CardHeader>
      {users.length > 1 && (
        <>
          <CardContent className="flex w-full max-w-lg flex-col gap-2">
            {users?.map((user) => (
              <FollowCard key={user?.id} user={user} />
            ))}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button asChild variant={"link"} className="w-full">
              <Link href={viewAllLink}>View All</Link>
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
