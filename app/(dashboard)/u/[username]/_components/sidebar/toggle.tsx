"use client"

import Hint from "@/app/(browse)/_components/Hint";
import { Button } from "@/components/ui/button";
import { useCreater } from "@/store/use_createrSidebar"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

const Toggle = () => {
 
    const { collapsed, onCollapse, onExpand } = useCreater((state) => state);
     const label = collapsed ? "Expand" : "Collapse";
 
  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center  pt-4 mb-4">
          <Hint label={label} side="right" asChild>
            <Button variant={"ghost"} className="h-auto p-2" onClick={onExpand}>
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 lg:flex items-center w-full ">
          <p className="font-semibold text-primary">Dashboard</p>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              className="h-auto p-2 ml-auto"
              variant={"ghost"}
            >
              <ArrowLeftFromLine className="h-4 w-4 " />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
}

export default Toggle