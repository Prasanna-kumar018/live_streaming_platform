import Db from "@/app/api/db/route";

export const getStreamByUserId = async (userId: string) => {
  const sql = await Db();
  const stream = await sql`select * from stream where userId =${userId}`;
  return stream;
};
