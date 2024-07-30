"use client";
import { cn } from "@/lib/utils";
import "../app/globals.css";
import { ReceivedChatMessage } from "@livekit/components-react";
import ChatMessage from "./ChatMessage";
import { Skeleton } from "@/components/ui/skeleton";
interface props {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}
const ChatList = ({ messages, isHidden }: props) => {
  if (isHidden || !messages || messages.length == 0) {
    return (
      <div className={cn(isHidden && "flex_item")}>
        <p
          className={cn("text-sm  text-center", {
            muted: isHidden,
          })}
        >
          {isHidden ? "Chat is disabled" : "Welcome to the Chat"}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((messages) => (
        <ChatMessage key={messages.timestamp} data={messages}></ChatMessage>
      ))}
    </div>
  );
};

export default ChatList;

export const ChatListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="h-[600px] w-6"></Skeleton>
    </div>
  );
};
