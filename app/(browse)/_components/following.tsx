"use client";
import { useSidebar } from "@/store/use_sidebar";
import Useritem, { UseritemSkeleton } from "./user_item";
interface props {
  data: Record<string, any>[];
  isLivearr: Array<boolean>;
}
const Following = ({ data, isLivearr }: props) => {
  const collapsed = useSidebar((state) => state.collapsed);
  const label = data.length > 0 && !collapsed;
  if (data.length == 0) return null;
  return (
    <>
      {label && (
        <div className="pl-6 mb-4 ">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2 ">
        {data.map((user, i) => (
          <Useritem
            key={user.id}
            username={user.username}
            imageUrl={user.imageurl}
            isLive={isLivearr[i]}
          />
        ))}
      </ul>
    </>
  );
};

export default Following;

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UseritemSkeleton key={i} />
      ))}
    </ul>
  );
};
