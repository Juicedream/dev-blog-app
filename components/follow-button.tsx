import { Button } from "@/components/ui/button";
type FollowButtonProps = {
  optimisticState: {
    following: boolean;
  };
  handleSubmit: () => void;
  formAction: (payload: FormData) => void;
  pending: boolean;
};

export default function FollowButton({
  optimisticState,
  handleSubmit,
  formAction,
  pending,
}: FollowButtonProps) {
  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <Button
        disabled={pending}
        size="lg"
        variant={optimisticState.following ? "secondary" : "default"}
        aria-label="Follow"
        className="rounded-xl"
      >
        {optimisticState.following ? "Following" : "Follow"}
      </Button>
    </form>
  );
}
