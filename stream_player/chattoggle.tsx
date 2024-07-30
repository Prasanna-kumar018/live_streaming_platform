"use client";

import Hint from "@/app/(browse)/_components/Hint";
import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/store/use_chat_sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

const ChatToggle = () => {
  const { OnChangeVariant, collapsed, onCollapse, onExpand, variant } =
    useChatSidebar((state) => state);
  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };
  const label = collapsed ? "Expand" : "Collapse";
  return (
    <Hint label={label} side="left" asChild>
          <Button onClick={onToggle}
              variant={'ghost'}
           className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
          >
            <Icon className="h-4 w-4"></Icon>
      </Button>
    </Hint>
  );
};

export default ChatToggle;
