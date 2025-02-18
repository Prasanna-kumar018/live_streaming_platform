import { Check } from "lucide-react";

const VerifiedMark = () => {
  return (
    <div className="p-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-blue-600">
      <Check className="w-[10px] h-[10px] text-primary stroke-[4px]"/>
    </div>
  );
};

export default VerifiedMark;
