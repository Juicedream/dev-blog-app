/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FollowButton from "@/components/follow-button";
import { toggleFollowAction } from "@/lib/action";
import { User } from "@/lib/definitions";
import { startTransition, useActionState, useOptimistic } from "react";

type FollowCardSettingsProps = {
  currentUser: User;
  dev: User;
  following: boolean;
  allFollowers?: string[];
};

export default function FollowCardSettings({
  currentUser,
  dev,
  following,
  allFollowers,
}: FollowCardSettingsProps) {
  const toggleFollow = toggleFollowAction.bind(null, {
    userId: currentUser.id,
    followUserId: dev.id,
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
  function handleSubmit() {
    startTransition(() => {
      addOptimistic(null);
    });
  }

  return (
    <div className="border-b-2 flex justify-between px-3 py-2 mb-2">
      <Avatar>
        <AvatarFallback>👤</AvatarFallback>
        <AvatarImage src={dev?.avatar} />
      </Avatar>

      <div className="flex flex-col items-start gap-1">
        <p className="font-bold text-lg">{dev?.name}</p>
        {/* <span className="text-sm text-muted-foreground">Developer</span> */}
        {!following && allFollowers?.includes(dev.id) && (
          <span className="text-sm text-muted-foreground animate-pulse">
            Follows you, Follow Back
          </span>
        )}
        {following && allFollowers?.includes(dev.id) && (
          <span className="text-sm text-muted-foreground">
            You both follow each other
          </span>
        )}
      </div>
      <FollowButton
        pending={pending}
        optimisticState={optimisticState}
        handleSubmit={handleSubmit}
        formAction={formAction}
      />
    </div>
  );
}
