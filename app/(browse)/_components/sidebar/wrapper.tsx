"use client"

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use_sidebar";
import { useEffect, useState } from "react";
import { ToggleSkeleton } from "../toggle";
import { RecommendedSkeleton } from "../recommended";
import { FollowingSkeleton } from "../following";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const [isClient,setisClient] = useState(false)
  const collapsed = useSidebar((state) => state.collapsed)
  useEffect(() => {
    setisClient(true)
  }, [])
  if (!isClient) return (
    <aside className="top-20 fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-[#252731] border-r-2 border-t-2   border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <FollowingSkeleton/>
      <RecommendedSkeleton />
    </aside>
  );
    return (
      <aside 
        className={cn(
          "top-20 fixed left-0 flex flex-col  w-60 h-full bg-[#252731] border-r-2 border-t-2   border-[#2D2E35] z-50",
          {
            "w-[70px]": collapsed,
          }
        )}
      >
        {children}
      </aside>
    );
};
