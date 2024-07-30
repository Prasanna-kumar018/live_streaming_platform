import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface LoadingProps {
  label: string;
}
export const Loading = ({ label }: LoadingProps) => {
  return (
    <div className="pt-4 h-full flex flex-col space-y-4 justify-center items-center">
      <Loader className="animate-spin h-10 w-10 text-muted-foreground ">
      </Loader>
        <p className="text-muted-foreground capitalize">{label}</p>
    </div>
  );
};
