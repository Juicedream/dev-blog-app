"use client";
import { useActionState, useOptimistic, startTransition } from "react";
import { toggleLikeAction } from "@/lib/action";

export function LikeButton({
  initialLikes,
  initialLiked,
  blogId,
  userId,
}: {
  initialLikes: number;
  initialLiked: boolean;
  blogId: string;
  userId: string;
}) {
  const toggleLike = toggleLikeAction.bind(null, { blogId, userId });
  const [state, formAction, pending] = useActionState(toggleLike, {
    liked: initialLiked,
    likes: initialLikes,
  });
  const [optimisticState, addOptimistic] = useOptimistic(
    state,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (current, _) => ({
      liked: !current.liked,
      likes: current.liked ? current.likes - 1 : current.likes + 1,
    }),
  );

  return (
    <form
      action={formAction}
      onSubmit={() => {
        startTransition(() => {
          addOptimistic(null);
        });
      }}
      className="flex gap-1 items-center mt-2 hover:cursor-pointer w-fit"
    >
      <button type="submit" className="flex gap-1" disabled={pending}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill={optimisticState.liked ? "#ff4757" : "#fff"}
          stroke="#ff4757"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
        </svg>
        <p className="text-sm text-yellow-500">{optimisticState.likes}</p>
      </button>
    </form>
  );
}
