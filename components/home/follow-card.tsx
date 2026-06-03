/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import FollowButton from "@/components/follow-button";
import {
  useState,
  useOptimistic,
  startTransition,
  useActionState,
} from "react";
import { toggleFollowAction } from "@/lib/action";
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
  currentUser: User;
  following: boolean;
};

export default function FollowCard({
  user,
  currentUser,
  following,
}: FollowCardProps) {
  const toggleFollow = toggleFollowAction.bind(null, {
    userId: currentUser.id,
    followUserId: user.id,
  });
  const [state, formAction, pending] = useActionState(toggleFollow, {
    following: following,
  });
  const [optimisticState, addOptimistic] = useOptimistic(
    state,
    (current, _) => ({
      following: !current.following,
    }),
  );
  // const [following, setFollowing] = useState(false);
  const fallbackName =
    user.name.split(" ")[0].charAt(0) + " " + user.name.split(" ")[1].charAt(0);
  function handleSubmit() {
    startTransition(() => {
      addOptimistic(null);
    });
  }
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
        <FollowButton
          pending={pending}
          optimisticState={optimisticState}
          handleSubmit={handleSubmit}
          formAction={formAction}
        />
      </ItemActions>
    </Item>
  );
}
