/* eslint-disable react-hooks/exhaustive-deps */
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

export default function FollowingSettings({
  currentUser,
  followings,
}: {
  currentUser: User;
  followings: User[];
}) {
  const role = currentUser?.role as unknown as "admin" | "user";
  const allFollowings = extractSimilarItemsFromArrayObj("id", followings);
  const followingsLength = followings?.length || 0;
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const dataLimit = 3;

  function sortDevsByQueryAndPage(query: string, pageNo: number) {
    const followingsArray =
      followings?.length < 1 || followings === undefined ? [] : followings;
    if (!query) return showDataByLimit(pageNo, followingsArray, dataLimit);
    return followingsArray.filter((following) =>
      following.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  const sortedFollowingsData = useMemo(() => {
    return sortDevsByQueryAndPage(query, page);
  }, [query, page]);

  const total = Math.ceil(followingsLength / dataLimit);
  return (
    <Card className="w-150 lg:w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex w-full">
            <p className="w-3/4">All Followings</p>
            {sortedFollowingsData.length > 2 && (
              <Input
                type="search"
                className="w-1/4"
                placeholder="Search followings..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            )}
          </div>
        </CardTitle>
        <CardDescription>
          {followingsLength < 1 ? (
            <p>
              Start following other devs.{" "}
              {role === "user" ? "Go to All Devs" : "Go to Devs"}
            </p>
          ) : (
            <p>Devs you are following</p>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="scroll-smooth overflow-auto overflow-y-scroll scrollbar-none h-52">
        {sortedFollowingsData?.map((dev) => {
          const following = allFollowings.includes(dev.id);
          return (
            <FollowCardSettings
              key={dev.id}
              currentUser={currentUser}
              dev={dev}
              following={following}
            />
          );
        })}
        {query && sortedFollowingsData.length < 1 && (
          <p className="text-sm text-muted-foreground font-bold text-center mt-10">
            No search result for {query}
          </p>
        )}
      </CardContent>
      <CardFooter>
        {!query && total > 1 && (
          <Pagination page={page} setPage={setPage} totalPages={total} />
        )}
      </CardFooter>
    </Card>
  );
}
