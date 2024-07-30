"use client"
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { updateStream } from "@/lib/stream";
import { useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";
type fieldprops = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";
interface props {
  field: fieldprops;
  label: string;
  value: boolean;
}
const ToggleCard = ({ field, label, value }: props) => {
    const [isPending, startTransition] = useTransition();
    const onChange = () =>
    {
        startTransition(() => {
            updateStream({ [field]: !value })
                .then(() => toast.success("Chat Settings changed Successfully"))
            .catch(()=>toast.error("Error updating chat settings"))
      })    
    }

    console.log(value)
  return (
    <div className="rounded-xl bg-[#262626] p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch disabled={isPending   } onCheckedChange={onChange} checked={value}>{value ? "On" : "off"}</Switch>
        </div>
      </div>
    </div>
  );
};

export default ToggleCard;

export const ToggleCardSkeleton = () =>
{
  return (
    <Skeleton className="rounded-xl p-10 w-full">
    </Skeleton>
  )  
}