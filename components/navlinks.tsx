"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/definitions";

type RoutesPropsType = {
  label: string;
  href: string;
};

export default function NavLinks({
  routes,
  user,
  handleLogout,
}: {
  routes: RoutesPropsType[];
  handleLogout: () => void;
  user: User;
}) {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <ul className="flex gap-4 md:gap-6 items-center">
        {routes?.map((link) => {
          return (
            <li
              key={link.label}
              className={cn(
                "px-4 py-2 rounded-2xl hover:bg-secondary transition-colors duration-300 ease-in-out",
                { "bg-primary/90 text-white": pathname === link.href },
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
      {user?.id && (
        <Button
          variant={"outline"}
          disabled={isLoggingOut}
          className="grow p-2 hover:bg-secondary rounded-2xl"
          onClick={() => {
            setIsLoggingOut(true);
            handleLogout();
          }}
        >
          <LogOutIcon className="w-20 text-red-500" />
        </Button>
      )}
    </div>
  );
}
