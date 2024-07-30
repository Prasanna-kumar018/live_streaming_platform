"use client"

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


interface props{
    value: string;
}
export const CopyButton = ({ value }: props) => {
    const [copied, setCopied] = useState(false);
    const onCopy = () => {
        if (!value)
            return;
        setCopied(true)
        navigator.clipboard.writeText(value);
        setTimeout(() => {
            setCopied(false)
            toast.success("Copied to Clipboard")
        }, 1000);
    }
    const Icon = copied ? CheckCheck : Copy;
    return (
      <Button
        onClick={onCopy}
        disabled={!value || copied}
        variant={"ghost"}
        size="sm"
      >
        <Icon className="h-4 w-4 " />
      </Button>
    );    
}