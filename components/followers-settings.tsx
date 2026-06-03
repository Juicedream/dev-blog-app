"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { User } from "@/lib/definitions";
import { Input } from "@/components/ui/input";

import FollowCardSettings from "@/components/follow-card-setting";
import {
  extractSimilarItemsFromArrayObj,
  showDataByLimit,
} from "@/utils/helpers";
import { useMemo, useState } from "react";
import Pagination from "@/components/pagination";

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
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const dataLimit = 2;
  const totalPages = Math.ceil(followersLength / dataLimit);

  function filterDevByQuery(query: string, pageNo: number) {
    if (!query) return showDataByLimit(pageNo, followers, dataLimit);
    return followers.filter((follower) =>
      follower.name.toLowerCase().includes(query.toLowerCase()),
    );
  }
  const sortedFollowersData = useMemo(() => {
    return filterDevByQuery(query, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex w-full">
            <p className="w-3/4">Your Followers</p>
            <Input
              type="search"
              className="w-1/4"
              placeholder="Search followers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </CardTitle>
        <CardDescription>
          {followersLength < 1 ? (
            <p>
              {" "}
              Start following other devs.{" "}
              {role === "user" ? "Go to All Devs" : "Go to Devs"}
            </p>
          ) : (
            <p>Devs following you</p>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="scroll-smooth overflow-auto overflow-y-scroll scrollbar-none h-52">
        {sortedFollowersData?.map((dev) => {
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
        {sortedFollowersData.length < 1 && (
          <div className="flex items-center justify-center w-full mt-10">
            <p className="mt-3 text-sm text-muted-foreground">
              No Dev with the name: {query}{" "}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!query && totalPages > 1 && (
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        )}
      </CardFooter>
    </Card>
  );
}
