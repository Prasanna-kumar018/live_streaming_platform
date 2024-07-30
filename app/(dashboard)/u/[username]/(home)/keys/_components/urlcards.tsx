import { Input } from "@/components/ui/input";
import { CopyButton } from "./copybutton";

interface props {
  value: string | null;
}
const UrlCard = ({ value }: props) => {
  return (
    <div className="rounded-xl  bg-[#262626] p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Server URL</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              disabled
              placeholder="Server URL"
            ></Input>
            <CopyButton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlCard;
