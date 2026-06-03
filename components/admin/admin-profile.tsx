import { Settings2Icon, User2Icon, Users2Icon } from "lucide-react";
import { User } from "@/lib/definitions";
import { ProfileCards } from "@/components/profile/profile-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserSettings from "@/components/user/user-settings";
import FollowersSettings from "@/components/followers-settings";
import FollowingSettings from "@/components/following-settings";

type UserProfileProps = {
  currentUser: User;
  noOfBlogs: number;
  followers: User[];
  followings: User[];
  noOfFollowings: number;
  noOfFollowers: number;
};

export default function AdminProfile({
  currentUser,
  noOfBlogs,
  followers,
  followings,
  noOfFollowings,
  noOfFollowers,
}: UserProfileProps) {
  return (
    <div className="w-full min-h-dvh flex flex-col gap-8 px-4 md:px-2 py-4">
      <ProfileCards
        currentUser={currentUser}
        noOfBlogs={noOfBlogs}
        noOfFollowers={noOfFollowers}
        noOfFollowings={noOfFollowings}
      />
      <div>
        <Tabs
          defaultValue="settings"
          className="w-200 flex justify-between rounded-2xl"
        >
          <TabsList>
            <TabsTrigger value="settings">
              <Settings2Icon />
              Settings
            </TabsTrigger>
            <TabsTrigger value="followers">
              <Users2Icon />
              Followers {`(${noOfFollowers})`}
            </TabsTrigger>
            <TabsTrigger value="followings">
              <User2Icon />
              Followings {`(${noOfFollowings})`}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="settings">
            <UserSettings currentUser={currentUser} />
          </TabsContent>
          <TabsContent value="followers">
            <FollowersSettings
              currentUser={currentUser}
              followers={followers}
              followings={followings}
            />
          </TabsContent>
          <TabsContent value="followings">
            <FollowingSettings
              currentUser={currentUser}
              followings={followings}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
