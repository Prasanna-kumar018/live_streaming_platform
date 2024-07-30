"use client";

import Hint from "@/app/(browse)/_components/Hint";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Volume1, Volume2, VolumeX } from "lucide-react";

interface VolumeProps {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
}
export const VolumeControl = ({ onChange, onToggle, value }: VolumeProps) => {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;
  let Icon=Volume1;
  if (isMuted)
  {
    Icon = VolumeX;
  } else if (isAboveHalf)
  {
    Icon = Volume2;
  }
  const label = isMuted ? "Unmute" : "Mute";
  const handleChange = (value: number[]) => {
    console.log(value)
    onChange(value[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <Button
          onClick={onToggle}
          className="bg-white hover:bg-white/10 p-3 rounded-lg"
        >
          <Icon className="h-6 w-6" />
        </Button>
      </Hint>
      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={handleChange}
        value={[value]}
        max={100}
        step={1}
      ></Slider>
    </div>
  );
};
