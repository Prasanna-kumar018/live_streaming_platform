"use server";

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";
import { getSelf } from "@/lib/auth_service";

import { getUserBYId } from "@/lib/user_service";
import { isBlockedByUser } from "@/lib/block_service";

export const createViwerToken = async (hostIdentity: string) => {
  let self;
  try {
    self = await getSelf();
  } catch {
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    self = { id, username };
  }

  const host = await getUserBYId(hostIdentity);
  console.log(host)
  if (host.length == 0) {
    throw new Error("User Not found");
  }
  const isBlocked = await isBlockedByUser(host[0].id);
  if (isBlocked) {
    throw new Error("User is Blocked");
  }
  const isHost = self.id === host[0].id;
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.username,
    }
  );
  token.addGrant({
    room: host[0].id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};
