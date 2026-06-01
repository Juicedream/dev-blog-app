import { User } from "@/lib/definitions";
import { ProfileCards } from "@/components/profile/profile-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings2Icon } from "lucide-react";

type AdminProfileProps = {
  currentUser: User;
  noOfBlogs: number;
  noOfFollowings: number;
  noOfFollowers: number;
};

export default function AdminProfile({
  currentUser,
  noOfBlogs,
  noOfFollowings,
  noOfFollowers,
}: AdminProfileProps) {
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
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
