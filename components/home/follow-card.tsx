import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/definitions";

type FollowCardProps = {
  user: User;
};

export default function FollowCard({ user }: FollowCardProps) {
  const fallbackName =
    user.name.split(" ")[0].charAt(0) + " " + user.name.split(" ")[1].charAt(0);
  return (
    <Item variant="outline">
      <ItemMedia>
        <Avatar className="size-10">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{fallbackName}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{user.name}</ItemTitle>
        <ItemDescription>Developer</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          size="lg"
          variant={"default"}
          aria-label="Follow"
          className="rounded-xl"
        >
          Follow
        </Button>
      </ItemActions>
    </Item>
  );
}
