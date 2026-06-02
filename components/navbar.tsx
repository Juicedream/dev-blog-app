import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ComputerIcon } from "lucide-react";
import NavLinks from "@/components/navlinks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  defaultLinks,
  adminRoleLinks,
  userRoleLinks,
  User,
} from "@/lib/definitions";
import { logout } from "@/app/actions/auth";
import { getUser } from "@/app/lib/dal";

export default async function Navbar() {
  const user = await getUser();
  const handleLogout = logout;
  const roleRoutes: Record<string, typeof defaultLinks> = {
    admin: adminRoleLinks,
    user: userRoleLinks,
  };
  const routes = user?.role
    ? (roleRoutes[user.role] ?? defaultLinks)
    : defaultLinks;

  const userName =
    user?.name.split(" ")[0].charAt(0) + user?.name.split(" ")[1].charAt(0) ||
    "User";

  return (
    <div className="h-20 border-b border-slate-200 shadow-sm shadow-black/20 px-4 md:px-10 flex items-center justify-between top-0 sticky z-999 bg-white py-2">
      <Button asChild>
        <Link href="/" className="text-xl font-semibold flex gap-2 ml-8">
          <ComputerIcon />
          DevBlog
        </Link>
      </Button>

      <div className="flex gap-4 items-center">
        {user && (
          <Avatar>
            <AvatarFallback>{userName}</AvatarFallback>
            <AvatarImage src={user?.avatar} />
          </Avatar>
        )}
        <NavLinks
          user={user as User}
          routes={routes}
          handleLogout={handleLogout}
        />
      </div>
    </div>
  );
}
