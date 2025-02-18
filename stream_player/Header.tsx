"use client";
import "../app/globals.css";
import UserAvatar, {
  UserAvatarSkeleton,
} from "@/app/(browse)/_components/useavatar";
import VerifiedMark from "@/components/verified-mark";
import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { UserIcon } from "lucide-react";
import Actions, { ActionsSkeleton } from "./actions";
import { Skeleton } from "@/components/ui/skeleton";
interface props {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  imageUrl: string;
  isFollowing: boolean;
  name: string;
}
const Header = ({
  hostIdentity,
  hostName,
  imageUrl,
  isFollowing,
  name,
  viewerIdentity,
}: props) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);
  const isLive = !!participant;
  const participantCount = participants.length - 1;
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div
      className="flex flex-col lg:flex-row gap-y-4
  lg:gap-y-0 items-start justify-between px-4 "
    >
      <div
        className="flex items-center gap-x-3
      mb-2 "
      >
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1 ml-4">
          <div className="flex items-center gap-x-2">
            <h2 className=" text-lg font-semibold ">{hostName}</h2>
            <VerifiedMark />
          </div>
          <div>
            <p>{name}</p>
          </div>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text_color">
              <UserIcon className="h-4 w-4" />
              <p>
                {"  " + participantCount}
                {participantCount === 1 ? " viewer" : " viewers"}
              </p>
            </div>
          ) : (
            <div className="font-semibold text-xs text-[#ccc] ">Offline</div>
          )}
        </div>
      </div>
      <Actions
        isFollowing={isFollowing}
        hostIdentity={hostIdentity}
        isHost={isHost}
        hostName={hostName}
      ></Actions>
    </div>
  );
};

export default Header;

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2 mt-1">
          <Skeleton className="h-6 w-32"></Skeleton>
          <Skeleton className="h-4 w-24"></Skeleton>
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  );
};
