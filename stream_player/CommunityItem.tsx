"use client";
import { onBlock } from "@/actions/block";
import Hint from "@/app/(browse)/_components/Hint";
import { Button } from "@/components/ui/button";
import { cn, stringToColor } from "@/lib/utils";
import { MinusCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
interface props {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}
const CommunityItem = ({
  hostName,
  participantIdentity,
  viewerName,
  participantName,
}: props) => {
  console.log(viewerName);
  const color = stringToColor(participantName || "");
  const isSelf = viewerName === participantName;
  const isHost = viewerName === hostName;
  const [isPending, startTransition] = useTransition();
  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) {
      return;
    }
    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error("Something went Wrong"));
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none "
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            variant={"ghost"}
            disabled={isPending}
            onClick={handleBlock}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <MinusCircle className="h-5 w-5" />
          </Button>
        </Hint>
      )}
    </div>
  );
};

export default CommunityItem;
