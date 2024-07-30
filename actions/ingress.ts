"use server";
import {
  IngressAudioEncodingOptions,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
  IngressAudioEncodingPreset,
} from "livekit-server-sdk";
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";

import Db from "@/app/api/db/route";
import { getSelf } from "@/lib/auth_service";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);
const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);
export const resetIngresses = async (hostIdentity: string) => {
  console.log("sldfjksl")
  console.log(ingressClient)
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });
  console.log("sldfjksl")
  const rooms = await roomService.listRooms([hostIdentity]);
  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }
  console.log("sldfjksl")
  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};
export const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf();
  const sql = await Db();
  console.log(self)
  await resetIngresses(self.id);
  console.log('sdfs')
  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };
  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    };
  }
  const ingress = await ingressClient.createIngress(ingressType, options);
  console.log(ingress)
  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create Ingress");
  }
  await sql`update stream set ingressid = ${ingress.ingressId}, serverurl = ${ingress.url}, streamkey = ${ingress.streamKey} where
    userid = ${self.id}`
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  revalidatePath(`/u/${self.username}/keys`);
  return ingress;
};
