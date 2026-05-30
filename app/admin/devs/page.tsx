import FollowCard from "@/components/home/follow-card";
import { fetchAllDevs } from "@/lib/data";

export default async function Devs() {
  const devs = await fetchAllDevs();
  return (
    <div className="flex flex-col items-center w-full justify-center gap-5">
      <p className="mr-auto text-xl font-bold">All Devs</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center gap-4 w-full">
        {devs.map((dev) => {
          return <FollowCard key={dev.id} user={dev} />;
        })}
      </div>
    </div>
  );
}
