import Db from "@/app/api/db/route";
import { getSelf } from "./auth_service";

export const getRecommended = async () =>
{ 
    let userid;
    try
    {
        const self = await getSelf();
        userid = self.id;
    } catch {
        userid = null;
    }
    console.log(userid)
    const sql = await Db();
    let users;
    if (userid)
    {
        users =
          await sql`select * from user_ where user_.id != ${userid} order by user_.createdAt desc`;        
    }
    else
    {
        users = await sql`select * from user_ order by createdAt desc`;     
    }
    return users;
}