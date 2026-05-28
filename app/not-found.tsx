import { FrownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="flex items-center gap-2 text-red-400">
        <FrownIcon />
        <b>404 | Page Not Found</b>
      </h1>
      <p>The page you requested for does not exist</p>
      <Button asChild>
        <Link href="/">Go Back</Link>
      </Button>
    </div>
  );
}
