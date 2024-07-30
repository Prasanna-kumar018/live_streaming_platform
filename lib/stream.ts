"use server";
import { revalidatePath } from "next/cache";
import Db from "@/app/api/db/route";
import { getSelf } from "./auth_service";
import { getStreamByUserId } from "./stream_service";

export const updateStream = async (values: Partial<Record<string, any>>) => {
  try {
    const sql = await Db();
    const self = await getSelf();
    const stream = await getStreamByUserId(self.id);
    console.log(stream);
    if (stream.length == 0) {
      throw new Error("Stream not found...");
    }
    console.log(values.isChatDelayed ,values);
    let isChatEnabled =
      values.isChatEnabled === undefined
        ? stream[0].ischatenabled
        : values.isChatEnabled;
    let isChatDelayed =
      values.isChatDelayed === undefined
        ? stream[0].ischatdelayed
        : values.isChatDelayed;
    let isChatFollowersOnly =
      values.isChatFollowersOnly === undefined
        ? stream[0].ischatfollowersonly
        : values.isChatFollowersOnly;
    let name =
      values.name === undefined
        ? stream[0].name
        : values.name;
    console.log(isChatDelayed, isChatEnabled, isChatFollowersOnly ,name);
    await sql`update stream set ischatenabled=${isChatEnabled} , 
    ischatdelayed = ${isChatDelayed},ischatfollowersonly =${isChatFollowersOnly} , name = ${name}
     where userId=${stream[0].userid}`
      .then((res) => console.log(res))
          .catch((err) => console.log(err));
      
      revalidatePath(`/u/${self.username}/chat`);
      revalidatePath(`/u/${self.username}`);
      revalidatePath(`/${self.username}`);
    return stream
  } catch {
    throw new Error("Internal Error");
  }
};
