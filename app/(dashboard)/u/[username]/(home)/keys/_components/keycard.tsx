"use client"
import { Input } from "@/components/ui/input";
import { CopyButton } from "./copybutton";
import { Button } from "@/components/ui/button";
import React from "react";

interface props {
  value: string | null;
}
const KeyCard = ({value}:props) => {
    const [show, setShow] = React.useState(false);
  return (
    <div className="rounded-xl bg-[#262626] p-6">
      <div className="flex  items-start gap-x-10 ">
        <p className="pt-2 font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              type={show ? "text" : "password"}
              disabled
              placeholder="Stream Key"
            ></Input>
            <CopyButton value={value || ""}></CopyButton>
          </div>
          <Button onClick={()=>setShow(!show)} size="sm" variant="link">
            { show ? "Hide":"Show"}          </Button>
        </div>
      </div>
    </div>
  );
}

export default KeyCard