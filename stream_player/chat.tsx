"use client";

import { ChatVariant, useChatSidebar } from "@/store/use_chat_sidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import ChatHeader, { ChatHeaderSkeleton } from "./chatHeader";
import ChatForm, { ChatFormSkeleton } from "./Chat_form";
import ChatList, { ChatListSkeleton } from "./ChatList";
import ChatCommunity from "./ChatCommunity"; 

interface props {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}
const Chat = ({
  viewerName,
  hostIdentity,
  hostName,
  isChatDelayed,
  isChatEnabled,
  isChatFollowersOnly,
  isFollowing,
}: props) => {
  const matches = useMediaQuery("max-width:1024px");
  const { variant, OnChangeVariant, collapsed, onCollapse, onExpand } =
    useChatSidebar((state) => state);
  const [value, setValue] = useState("");
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;
  const { chatMessages: messages, send } = useChat();
  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);
  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!send) return;
    send(value);
    console.log(value);
    setValue("");
  };
  const onChange = (value: string) => {
    setValue(value);
  };
  return (
    <div className="flex flex-col bg-background  pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant == ChatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          ></ChatForm>
        </>
      )}
      {variant == ChatVariant.COMMUNITY && (
        <ChatCommunity 
          viewerName={viewerName}
          hostName={hostName}
          isHidden={isHidden}
        ></ChatCommunity>
      )}
    </div>
  );
};

export default Chat;

export const ChatSkeleton = () =>
{
  return (
    <div className="flex flex-col border-l border-b border-[#262626] pt-0 h-[calc(100vh-80px)] border-2">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );  
}