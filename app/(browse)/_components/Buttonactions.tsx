"use client";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { onBlock, onUnblock } from "@/actions/block";
interface props {
  isFollowing: boolean;
  userId: string;
  isBlockedbySelf: boolean;
  username: string;
  selfId: string;
}
const Actions = ({
  isFollowing,
  userId,
  isBlockedbySelf,
  username,
  selfId,
}: props) => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then(() => toast.success(`You have started Following ${username}`))
        .catch(() => toast.error("Internal Error"));
    });
  };
  const handleunFollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then(() => toast.success(`You have Unfollowed ${username}.`))
        .catch(() =>
          toast.error("Internal Error or You cannot Unfollow Yourself")
        );
    });
  };
  const onclick = () => {
    if (isFollowing) {
      handleunFollow();
    } else {
      handleFollow();
    }
  };
  const handleblock = () => {
    startTransition(() => {
      onBlock(userId)
        .then(() => toast.success(`You have Blocked ${username}.`))
        .catch(() => toast.error("Internal Error "));
    });
  };
  const handleunblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then(() => toast.success(`You have UnBlocked ${username}.`))
        .catch(() => toast.error("Internal Error"));
    });
  };
  const onblock = () => {
    if (isBlockedbySelf) {
      handleunblock();
    } else {
      handleblock();
    }
  };
  if (selfId == userId) return <></>;
  return (
    <>
      <Button disabled={isPending} onClick={onclick} variant={"custom"}>
        {isFollowing ? "UnFollow" : "Follow"}
      </Button>
      <Button onClick={onblock} disabled={isPending}>
        {isBlockedbySelf ? "Unblock" : "block"}
      </Button>
    </>
  );
};

export default Actions;
