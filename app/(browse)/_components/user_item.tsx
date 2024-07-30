"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use_sidebar";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import UserAvatar from "./useavatar";
import { LiveBadge } from "./live_badge";
interface props {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}
const Useritem = ({ username, imageUrl, isLive }: props) => {
  const pathname = usePathname();

  const collapsed = useSidebar((state) => state.collapsed);
  const href = `/${username}`;
  const isActive = href === pathname;
  return (
    <Button
      asChild
      variant={"ghost"}
      className={cn(
        "w-full h-12 ",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            "flex items-center w-full gap-x-4 ",
            collapsed && "justify-center"
          )}
        >
          <UserAvatar
            imageUrl={imageUrl}
            showBadge={true}
            username={username}
            isLive={isLive}
          ></UserAvatar>
          {!collapsed && <p className="truncate">{username}</p>}
          {!collapsed && isLive && <LiveBadge className="ml-auto"></LiveBadge>}
        </div>
      </Link>
    </Button>
  );
};

export default Useritem;

export const UseritemSkeleton = () => {
  return (
    <li className="flex items-center  gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6 " />
      </div>
    </li>
  );
};
