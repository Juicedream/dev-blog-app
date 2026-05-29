import { geistMono } from "@/app/layout";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
export default function Header({ title }: { title: string }) {
  return (
    <main className="border-b border-slate-200 w-full md:h-15 h-25 flex flex-col md:flex-row items-center justify-between px-2 py-2 md:py-0 md:px-3">
      <h2 className={`${geistMono.variable} text-lg md:text-xl`}>{title}</h2>
      <Button asChild variant={"outline"}>
        <Link href="/blogs/create" className="flex gap-2">
          <PlusIcon />
          Create
        </Link>
      </Button>
    </main>
  );
}
