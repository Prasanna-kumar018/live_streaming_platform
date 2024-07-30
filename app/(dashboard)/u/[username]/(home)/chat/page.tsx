"use server";

import { getSelf } from "@/lib/auth_service";
import { getStreamByUserId } from "@/lib/stream_service";
import ToggleCard from "../../_components/togglCard";

const Chat = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);
  if (stream.length == 0) {
    throw new Error("Stream not found...");
  }
  console.log(stream)
  return (
    <div className="p-6 ">
      <div className="  mb-4">
        <h1 className="text-2xl font-bold">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable Chat"
          value={stream[0].ischatenabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay Chat"
          value={stream[0].ischatdelayed}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Must be following to Chat"
          value={stream[0].ischatfollowersonly}
        />
      </div>
    </div>
  );
};

export default Chat;
