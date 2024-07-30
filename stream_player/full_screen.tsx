"use client";

import { Maximize, Minimize } from "lucide-react";

import Hint from "@/app/(browse)/_components/Hint";
import { Button } from "@/components/ui/button";

interface props {
  isFullScreen: boolean;
  onToggle: () => void;
}

export const FullScreenControl = ({ isFullScreen, onToggle }: props) => {
  const Icon = isFullScreen ? Minimize : Maximize;
  const label = isFullScreen ? "Exit FullScreen" : "Enter FullScreen";
  return (
    <div className="flex items-center justify-center gap-4">
          <Hint label={label} asChild>
              <Button onClick={onToggle}
              className="text-white p-3 hover:bg-white/10 rounded-lg">
                  <Icon className="h-5 w-5"/>
              </Button>
      </Hint>
    </div>
  );
};
