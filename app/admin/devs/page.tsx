import { getUser } from "@/app/lib/dal";
import FollowCard from "@/components/home/follow-card";
import { fetchAllDevs } from "@/lib/data";

export default async function Devs() {
  const user = await getUser();
  const devs = await fetchAllDevs(user?.id);
  if (devs.length < 1) {
    return (
      <div className="flex flex-col items-center w-full justify-center">
        <p className="text-muted-foreground mt-3 text-xl">No Devs Found</p>
      </div>
    );
  }
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
