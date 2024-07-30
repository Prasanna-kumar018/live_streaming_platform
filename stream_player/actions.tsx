"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface props {
  isFollowing: boolean;
  hostIdentity: string;
  isHost: boolean;
  hostName: string;
}
const Actions = ({ hostIdentity, isFollowing, isHost, hostName }: props) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then(() => toast.success(`You Started Following ${hostName}`))
        .catch(() => toast.error("Something Went Wrong..."));
    });
  };
  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then(() => toast.success(`You have Unfollowed  ${hostName}`))
        .catch(() => toast.error("Something Went Wrong..."));
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      router.push("/sign-in");
    }
    if (!isHost) return;
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };
  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant={"custom"}
      size={"sm"}
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn(
          "h-4 w-4  mr-2",
          isFollowing ? "fill-white" : "fill-none"
        )}
      />
      {isFollowing ? "UnFollow" : "Follow"}
    </Button>
  );
};

export default Actions;

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};