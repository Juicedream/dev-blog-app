import { Settings2Icon, User2Icon, Users2Icon } from "lucide-react";
import { User } from "@/lib/definitions";
import { ProfileCards } from "@/components/profile/profile-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserSettings from "@/components/user/user-settings";

type UserProfileProps = {
  currentUser: User;
  noOfBlogs: number;
  noOfFollowings: number;
  noOfFollowers: number;
};

export default function UserProfileComponent({
  currentUser,
  noOfBlogs,
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
              Followers
            </TabsTrigger>
            <TabsTrigger value="followings">
              <User2Icon />
              Followings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="settings">
            <UserSettings currentUser={currentUser} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
