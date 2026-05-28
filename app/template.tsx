import { ReactNode } from "react";
import Navbar from "@/components/navbar";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <div className="flex items-center justify-center my-4 md:my-6 md:mx-6 mx-2 md:gap-8">
        <div className="w-full px-14">{children}</div>
      </div>
    </div>
  );
}
