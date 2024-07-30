"use client";
import { getRecommended } from "@/lib/recommended_service";
import { useSidebar } from "@/store/use_sidebar";
import Useritem, { UseritemSkeleton } from "./user_item";

interface props {
  data: Array<Record<string, any>>;
  isLivearr: Array<boolean>;
}
const Recommended = ({ data, isLivearr }: props) => {
  console.log(isLivearr);
  const collapsed = useSidebar((state) => state.collapsed);
  const showlabel = !collapsed && data.length > 0;
  return (
    <div>
      {showlabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user,i) => (
          <Useritem
            key={user.id}
            username={user.username}
            imageUrl={user.imageurl}
            isLive={isLivearr[i]}
          />
        ))}
      </ul>
    </div>
  );
};

export default Recommended;

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UseritemSkeleton key={i}></UseritemSkeleton>
      ))}
    </ul>
  );
};
