import Db from "@/app/api/db/route";
import { getSelf } from "./auth_service";

export const getStreams = async () => {
  let userid;
  const sql = await Db();
  try {
    const self = await getSelf();
    userid = self.id;
  } catch {
    userid = null;
  }
  let streams = [];
  if (userid) {
      streams =
          await sql`select * from (select * from stream where islive=${true} order by updatedat desc) T where not
exists( select * from blocked where blockerid=T.userid and blokedid=${userid})`;
  } else {
    streams =
      await sql`select * from stream where islive=${true} order by updatedat desc`;
    }
    return streams;
    
};
