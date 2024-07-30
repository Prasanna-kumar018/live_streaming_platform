"use client";

import { cn } from "@/lib/utils";
import { useCreater } from "@/store/use_createrSidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
 

const Container = ({ children }: { children: React.ReactNode }) => {
  const { collapsed, onCollapse, onExpand } = useCreater((state) => state);
  const matches = useMediaQuery("(max-width:1024px)");
  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches]);
  return (
    <div
      className={cn("flex-1", {
        "ml-[70px]": collapsed,
        "ml-[70px] lg:ml-60": !collapsed,
      })}
    >
      {children}
    </div>
  );
};

export default Container;
