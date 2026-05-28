import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ComputerIcon } from "lucide-react";
// import { User } from "@/lib/definitions";
import NavLinks from "@/components/navlinks";

export default function Navbar() {
  return (
    <div className="h-20 border-b border-slate-200 shadow-sm shadow-black/20 px-4 md:px-10 flex items-center justify-between top-0 sticky z-999 bg-white py-2">
      <Button asChild>
        <Link href="/" className="text-xl font-semibold flex gap-2 ml-8">
          <ComputerIcon />
          DevBlog
        </Link>
      </Button>

      <NavLinks />
    </div>
  );
}
