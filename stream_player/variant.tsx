"use client";

import Hint from "@/app/(browse)/_components/Hint";
import { Button } from "@/components/ui/button";
import { ChatVariant, useChatSidebar } from "@/store/use_chat_sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine, MessageSquare, Users } from "lucide-react";

const VariantToggle = () => {
  const { OnChangeVariant, collapsed, onCollapse, onExpand, variant } =
    useChatSidebar((state) => state);
  
  const isChat = variant == ChatVariant.CHAT;
  const Icon = isChat ? Users : MessageSquare;
  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
    OnChangeVariant(newVariant)
  };
  const label = isChat ? "Community" : "Go back to Chat";
  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant={"ghost"}
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4"></Icon>
      </Button>
    </Hint>
  );
};

export default VariantToggle;
