"use client";
import useViewerToken from "@/hooks/use_viewer_token";
import { getUserBYId } from "@/lib/user_service";
import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use_chat_sidebar";
import Header, { HeaderSkeleton } from "@/stream_player/Header";
import InfoCard from "@/stream_player/InfoCard";
import Chat, { ChatSkeleton } from "@/stream_player/chat";
import { ChatHeaderSkeleton } from "@/stream_player/chatHeader";
import ChatToggle from "@/stream_player/chattoggle";
import Video, { VideoSkeleton } from "@/stream_player/video";
import { LiveKitRoom } from "@livekit/components-react";
interface props {
  user: Record<string, any>;
  stream: Record<string, any>;
  isFollowing: boolean;
}
const StreamPlayer = ({ stream, user, isFollowing }: props) => {
  console.log(stream);
  const { identity, name, token } = useViewerToken(user.id);
  const { OnChangeVariant, collapsed, onCollapse, onExpand, variant } =
    useChatSidebar((state) => state);
  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }
  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle></ChatToggle>
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3            xl:grid-cols-3 2xl:grid-cols-6  h-full",
          collapsed && "lg:grid-cols-2  xl:grid-cols-2 2xl:grid-cols-2 "
        )}
      >
        <div
          className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 
              lg:overflow-y-auto pb-10 "
        >
          <Video hostName={user.username} hostIdentity={user.id}></Video>

          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageurl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl = {stream.thumbnailurl}
          />
        </div>
        <div
          className={cn(
            "col-span-1 border-[#262626] border-l-2 pl-2 max-lg:border-t-2 max-lg:border-[#262626] max-lg:pt-2",
            collapsed && "hidden "
          )}
        >
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.ischatenabled}
            isChatDelayed={stream.ischatdelayed}
            isChatFollowersOnly={stream.ischatfollowersonly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export default StreamPlayer;

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div
        className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 
       lg:overflow-y-auto hidden-scrollbar pb-10  "
      >
        <VideoSkeleton />
        <HeaderSkeleton/>
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
