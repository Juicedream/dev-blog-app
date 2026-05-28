import { ReactNode } from "react";
import Navbar from "@/components/navbar";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <div className="flex items-center justify-center my-6">
        <div className="mx-2 md:mx-6 w-200">{children}</div>
      </div>
    </div>
  );
}
