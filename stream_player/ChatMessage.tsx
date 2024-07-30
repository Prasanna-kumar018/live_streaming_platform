"use client";

import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";
import { format } from "date-fns";

interface props {
  data: ReceivedChatMessage;
}
const ChatMessage = ({ data }: props) => {
  const color = stringToColor(data.from?.name || "");

     const timestamp = new Date(data.timestamp);
  return (
    <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
      <p className="text-sm text-white/40 inline-block">{format(timestamp, "HH:mm")}</p>
      <div className="flex flex-wrap items-baseline gap-1 grow">
        <p className="text-sm font-semibold whitespace-nowrap">
          <span className="truncate" style={{ color: color }}>
            {data.from?.name}
          </span>
          :&nbsp;
        </p>
        <p className="break-words text-sm"> {data.message }</p>
      </div>
    </div>
  );
};

export default ChatMessage;
