import { ParticipantName, useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import "../app/globals.css";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import CommunityItem from "./CommunityItem";
import { LocalParticipant, RemoteParticipant } from "livekit-client";
interface props {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
}
const ChatCommunity = ({ viewerName, hostName, isHidden }: props) => {
  const [value, setvalue] = useState("");
  const [debouncedValue] = useDebounce<string>(value, 500);
  const participants = useParticipants();
  const onChange = (newValue: string) =>
  {
    setvalue(newValue);
  };
  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);
    return deduped.filter((p) => {
      return p.name?.toLowerCase().includes(debouncedValue.toLowerCase());
    });
  }, [participants, debouncedValue]);
  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="muted">Community is Disabled...</p>
      </div>
    );
  }
  return (
    <div className="p-4 ">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search community"
        className="border-white/10"
      ></Input>
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-[#ccc] pt-4 hidden lasted">
          No Results
        </p>
        {filteredParticipants.length > 0 &&
          filteredParticipants.map((e) => (
            <CommunityItem
              key={e.identity}
              hostName={hostName}
              viewerName={viewerName}
              participantName={e.name}
              participantIdentity={e.identity}
            ></CommunityItem>
          ))}
      </ScrollArea>
    </div>
  );
};

export default ChatCommunity;
