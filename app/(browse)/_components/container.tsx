"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useSidebar } from "@/store/use_sidebar";

const Container = ({ children }: { children: React.ReactNode }) => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
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
