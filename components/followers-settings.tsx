"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { User } from "@/lib/definitions";
import { Input } from "@/components/ui/input";

import FollowCardSettings from "@/components/follow-card-setting";
import { extractSimilarItemsFromArrayObj } from "@/utils/helpers";
export default function FollowersSettings({
  currentUser,
  followers,
  followings,
}: {
  currentUser: User;
  followers: User[];
  followings: User[];
}) {
  const role = currentUser?.role as unknown as "admin" | "user";
  const allFollowings = extractSimilarItemsFromArrayObj("id", followings);
  const followersLength = followings?.length || 0;
  const allFollowers = extractSimilarItemsFromArrayObj("id", followers);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex w-full">
            <p className="w-3/4">Your Followers</p>
            <Input type="search" className="w-1/4" />
          </div>
        </CardTitle>
        {followersLength < 1 && (
          <CardDescription>
            Start following other devs.{" "}
            {role === "user" ? "Go to All Devs" : "Go to Devs"}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="scroll-smooth overflow-auto overflow-y-scroll scrollbar-none h-40">
        {followers?.map((dev) => {
          const following = allFollowings.includes(dev.id);
          return (
            <FollowCardSettings
              key={dev.id}
              currentUser={currentUser}
              dev={dev}
              following={following}
              allFollowers={allFollowers as string[]}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
