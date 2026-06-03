"use client";
import { User } from "@/lib/definitions";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useActionState, useEffect } from "react";
import { updateProfilePicAction, removeProfileAction } from "@/lib/action";
import { toast } from "sonner";

function UserSettings({ currentUser }: { currentUser: User }) {
  const [avatarImg, setAvatarImg] = useState(currentUser?.avatar ?? "");
  const [isEditing, setIsEditing] = useState(
    currentUser?.avatar ? false : true,
  );
  const initialState: { error: object; message: string | null } | undefined = {
    error: {},
    message: null,
  };
  const updateAvatarImg = updateProfilePicAction.bind(
    null,
    currentUser?.id as string,
  );
  const [updateProfileState, updateProfileAction, profilePicPending] =
    useActionState(updateAvatarImg, initialState);

  const prevState: { error: object; message: string | null } | undefined = {
    error: {},
    message: null,
  };
  const removeProfileImg = removeProfileAction.bind(
    null,
    currentUser?.id as string,
  );
  const [removeProfileState, removeProfilePicAction, removeProfilePicPending] =
    useActionState(removeProfileImg, prevState);

  useEffect(() => {
    if (updateProfileState?.message) {
      toast.error(updateProfileState.message);
    }
    if (removeProfileState?.message) {
      toast.error(removeProfileState.message);
    }
  }, [updateProfileState, removeProfileState]);

  return (
    <Card className="shadow-sm shadow-black/30 w-150 lg:w-full">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Change and update your profile</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <div className="w-full flex flex-col gap-4 lg:gap-0 lg:flex-row justify-around items-center">
          {/* Left */}
          <div className="flex flex-col gpa-3">
            <h3 className="font-bold text-xl">Change Profile image</h3>
            <form
              className="flex flex-col gap-4 items-center"
              action={updateProfileAction}
            >
              <Input
                className="hidden"
                readOnly
                value={currentUser?.role as unknown as string}
                name="role"
              />
              <Avatar>
                <AvatarFallback>DEV</AvatarFallback>
                {!avatarImg ? null : (
                  <AvatarImage src={avatarImg ?? currentUser?.avatar} />
                )}
              </Avatar>
              <Label htmlFor="profile-pic">Profile Picture Link</Label>
              <Input
                type="text"
                readOnly={avatarImg && !isEditing ? true : false}
                id="profile-pic"
                name="avatar"
                value={avatarImg === null ? "" : avatarImg}
                autoFocus
                onChange={(e) => setAvatarImg(e.target.value)}
              />
              {avatarImg && isEditing && (
                <Button
                  onClick={() => setTimeout(() => setIsEditing(false), 3000)}
                  disabled={!avatarImg || profilePicPending}
                >
                  {profilePicPending ? "Saving..." : "Save"}
                </Button>
              )}
            </form>
            {currentUser?.avatar && (
              <div className="flex justify-center mt-3">
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)}>Change</Button>
                )}
                {isEditing && (
                  <Button
                    variant={"destructive"}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            )}
            {currentUser?.avatar && !isEditing && (
              <form
                className="w-full flex justify-center mt-3"
                action={removeProfilePicAction}
              >
                <Input
                  className="hidden"
                  readOnly
                  name="avatar"
                  value={avatarImg as unknown as string}
                />
                <Input
                  className="hidden"
                  readOnly
                  value={currentUser?.role as unknown as string}
                  name="role"
                />
                <Button
                  variant={"outline"}
                  onClick={() =>
                    setTimeout(() => {
                      setAvatarImg("");
                      setIsEditing(true);
                    }, 3000)
                  }
                >
                  {removeProfilePicPending ? "Removing..." : "Remove"}
                </Button>
              </form>
            )}
          </div>
          {/* Right */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-xl">Change Password</h3>
            <form className="flex flex-col gap-4">
              <div>
                <Label htmlFor="new-password" className="mb-2">
                  New password
                </Label>
                <Input type="password" id="new-password" />
              </div>
              <div>
                <Label htmlFor="confirm-password" className="mb-2">
                  Confirm password
                </Label>
                <Input type="password" id="confirm-password" />
              </div>
              <Button disabled>Update</Button>
            </form>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mx-auto mt-8">
        <Button disabled variant={"destructive"}>
          Delete this account
        </Button>
      </CardFooter>
    </Card>
  );
}

export default UserSettings;
