import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";

// const defaultLinks = [
//   { label: "Sign In", href: "/sign-in" },
//   { label: "Sign Up", href: "/sign-up" },
// ];
const adminRoleLinks = [
  { label: "Profile", href: "/admin/profile" },
  { label: "Users", href: "/admin/users" },
  { label: "My Blogs", href: "/admin/blogs" },
];

// const userRoleLinks = [
//   { label: "Profile", href: "/user/profile" },
//   { label: "My Blogs", href: "/user/blogs" },
// ];

export default function NavLinks() {
  return (
    <div className="flex items-center">
      <ul className="flex gap-4 md:gap-6 items-center">
        {adminRoleLinks.map((link) => {
          return (
            <li
              key={link.label}
              className={cn(
                "px-4 py-2 rounded-2xl hover:bg-secondary transition-colors",
                {
                  "bg-primary text-white hover:bg-secondary hover:text-black":
                    link.label === "Sign Up",
                },
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
      <div className="grow p-2 hover:bg-secondary rounded-2xl">
        <LogOutIcon className="w-20 text-red-500" />
      </div>
    </div>
  );
}
