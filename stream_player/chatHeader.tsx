"use client";

import { Skeleton } from "@/components/ui/skeleton";
import ChatToggle from "./chattoggle";
import VariantToggle from "./variant";

const ChatHeader = () => {
  return (
    <div className="relative p-3 border-b ">
      <div className="flex items-center justify-center">
        <ChatToggle />
        <p className="font-semibold flex flex-1 text-primary justify-center">
          Stream Chat
        </p>
      </div>
      <div className="absolute right-2  top-2">
        <VariantToggle />
      </div>
    </div>
  );
};

export default ChatHeader;

export const ChatHeaderSkeleton = () => {
  return (
    <div className="relative p-3 border-b hidden md:block">
      <Skeleton className="absolute h-6 w-6 left-3 top-3"></Skeleton>
      <Skeleton className="w-28 h-6 mx-auto"></Skeleton>
    </div>
  );
};
