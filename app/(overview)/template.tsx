import { ReactNode } from "react";

import WhoToFollowCard from "@/components/home/who-to-follow-card";

import { usersToFollow } from "@/lib/data";

export default async function Template({ children }: { children: ReactNode }) {
  const users = (await usersToFollow()) ?? [];
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex flex-col md:flex-row justify-between my-4 md:my-6 md:mx-6 mx-2 md:gap-8 gap-10">
        <div className="w-full">{children}</div>
        <aside className="shrink-0 hidden md:block w-100 rounded-2xl">
          <WhoToFollowCard users={users} viewAllLink="/admin/devs" />
        </aside>
      </div>
    </div>
  );
}
