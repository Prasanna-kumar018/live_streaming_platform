import Hint from "@/app/(browse)/_components/Hint";
import { Info } from "lucide-react";
import { useMemo } from "react";
interface props {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}
const ChatInfo = ({ isDelayed, isFollowersOnly }: props) => {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Only Followers can chat";
    }
    if (isDelayed && !isFollowersOnly) {
      return "Messages are delayed by 3 seconds";
    }
    if (isDelayed && isFollowersOnly) {
      return "Only Followers can Chat.Messages are delayed by 3 seconds";
    }
    return "";
  }, [isDelayed, isFollowersOnly]);
  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Followers Only";
    }
    if (isDelayed && !isFollowersOnly) {
      return "Slow mode";
    }
    if (isDelayed && isFollowersOnly) {
      return "Followers Only and Slow mode";
    }
    return "";
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) {
    return null;
  }
  return (
    <div className="p-2  text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2 mb-4">
      <Hint label={hint}>
        <Info className="w-4 h-4" />
      </Hint>
      <p className="text-xs font-semibold ">{label}</p>
    </div>
  );
};

export default ChatInfo;
