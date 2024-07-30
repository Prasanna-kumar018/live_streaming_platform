"use client";
import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { OfflineVideo } from "./offline";
import { Loading } from "./loading";
import LiveVideo from "./live_video";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransition } from "react";
import { setlive, unsetlive } from "@/lib/user_service";
import { useTemp } from "@/store/temp";
interface props {
  hostName: string;
  hostIdentity: string;
}
const Video = ({ hostIdentity, hostName }: props) => {
  console.log(hostIdentity)
  const connectionState = useConnectionState();
  const [isPending, startTransition] = useTransition();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);
  let content;

  console.log(connectionState);
  if (!participant && ConnectionState.Connected === connectionState) {
    content = <OfflineVideo username={hostName} />;
  } else if (!participant || tracks.length == 0) {
    content = <Loading label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }
  return (
    <div className="aspect-video border-b border-[#262626] group relative">
      {content}
    </div>
  );
};

export default Video;

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video">
      <Skeleton className="video rounded-none"></Skeleton>
    </div>
  );
};
