import { currentUser } from "@clerk/nextjs/server";
import Db from "@/app/api/db/route";

export const getSelf = async () => {
  const self = await currentUser();
  if (!self || !self.username) {
    throw new Error("Unauthorized User");
  }
  const sql = await Db();
  const user =
    await sql`select * from user_ where user_.externalUserId=${self.id}`;
  console.log("user ", user[0]);
  return user[0];
};
export const getFollowersById = async (followedUser: Record<string, any>[]) => {
  const sql = await Db();
  var res = [];
  for (let i = 0; i < followedUser.length; i += 1) {
    const user =
      await sql`select * from user_ where id=${followedUser[i].followingid}`;
    res.push(user[0]);
  }
  return res;
};

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();
  const sql = await Db();
  if (!self || !self.username) {
    throw new Error("Unauthorized User");
  }
  const user =
    await sql`select * from user_ where user_.username = ${username}`;

  if (user.length == 0) {
    throw new Error("User Not found");
  }
  if (self.username !== user[0].username) {
    throw new Error("UnAuthorized...");
  }

  return user;
};
export const getLiveArray = async (users: Record<string, any>[]) => {
  const sql = await Db();
  let res = [];
  for (let i = 0; i < users.length; i += 1) {
    const r = await sql`select * from stream where userid= ${users[i].id}`;
    if (r.length > 0) {
      res.push(r[0].islive);
    }
  }

  return res;
};