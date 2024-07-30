import { getSelf } from "./auth_service";
import Db from "@/app/api/db/route";

export const isBlockedByUser = async (id: string) => {
  try {
    const sql = await Db();
    const self = await getSelf();
    const otheruser = await sql`select * from user_ where user_.id = ${id}`;
    if (otheruser.length == 0) {
      throw new Error("User not found");
    }
    if (otheruser[0].id == self.id) {
      return false;
    }
    const existingBlock =
      await sql`select * from blocked where blockerId=${otheruser[0].id}
        and blokedId=${self.id}`;
    if (existingBlock.length > 0) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const isBlockedBySelf = async (id: string) => {
  try {
    const sql = await Db();
    const self = await getSelf();
    const otheruser = await sql`select * from user_ where user_.id = ${id}`;
    if (otheruser.length == 0) {
      throw new Error("User not found");
    }
    if (otheruser[0].id == self.id) {
      return false;
    }
    const existingBlock =
      await sql`select * from blocked where blockerId=${self.id}
        and blokedId=${otheruser[0].id}`;
    if (existingBlock.length > 0) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
export const blockUser = async (id: string) =>
{
    const sql = await Db();
    const self = await getSelf()
    const otheruser = await sql`select * from user_ where user_.id = ${id}`;
    console.log(otheruser)
    if (otheruser.length == 0) {
      throw new Error("User not found");
    }
    if (otheruser[0].id == self.id) {
      throw new Error("You cannot Block Yourself");
    }
    const existingBlock =
      await sql`select * from blocked where blockerId=${self.id}
        and blokedId=${otheruser[0].id}`;
    console.log(existingBlock)
    if (existingBlock.length > 0) {
      throw new Error("You have already blocked this user");
    }
    
    await sql`insert into blocked values(${self.id}, ${otheruser[0].id})`;
    console.log(otheruser[0].username)
    return otheruser[0].username;
}

export const unblockUser = async (id: string) => {
  const sql = await Db();
  const self = await getSelf();
  const otheruser = await sql`select * from user_ where user_.id = ${id}`;
  if (otheruser.length == 0) {
    throw new Error("User not found");
  }
  if (otheruser[0].id == self.id) {
    throw new Error("You cannot Unblock Yourself");
  }
  const existingBlock =
    await sql`select * from blocked where blockerId=${self.id}
        and blokedId=${otheruser[0].id}`;
  if (existingBlock.length == 0) {
    throw new Error("You have n't blocked this user already");
  }

  await sql`delete from  blocked where blockerId = ${self.id} and blokedId=${otheruser[0].id}`;
  return otheruser[0].username;
};