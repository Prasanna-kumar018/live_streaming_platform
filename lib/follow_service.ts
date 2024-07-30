import { getSelf } from "./auth_service";
import Db from "@/app/api/db/route";

export const getFollowedUser = async () => {
  try {
      const sql = await Db();
      const self = await getSelf();
      const res = await sql`select * from follow where followerId=${self.id}`;
      console.log(res)
      return res;
  } catch {
    return [];
  }
};
export const isFollowingUser = async (id: string) => {
  console.log(id);
  try {
    const sql = await Db();
    const self = await getSelf();
    const otheruser = await sql`select * from user_ where user_.id = ${id}`;
    if (otheruser.length == 0) {
      throw new Error("User not found");
    }
    if (otheruser[0].id == self.id) {
      return true;
    }
    const following =
      await sql`select * from follow where followerId = ${self.id} and followingId = ${otheruser[0].id}`;
    if (following.length == 0) {
      return false;
    } else {
      return true;
    }
  } catch {
    return false;
  }
};
export const followUser = async (id: string) => {
  const sql = await Db();
  const self = await getSelf();
  const otheruser = await sql`select * from user_ where user_.id = ${id}`;
  if (otheruser.length == 0) {
    throw new Error("User not Found");
  }
  if (otheruser[0].id === self.id) {
    throw new Error("Cannot follow Yourself");
  }
  console.log(otheruser);
  const existingFollow =
    await sql`select * from follow where followerId = ${self.id} and followingId = ${otheruser[0].id} `;
  console.log(existingFollow.length);
  if (existingFollow.length > 0) {
    throw new Error("Already Following");
  }
  await sql`insert into follow (followerId,followingId) values 
    (${self.id},${otheruser[0].id})`;
  return otheruser[0].username;
};

export const UnfollowUser = async (id: string) => {
  const sql = await Db();
  const self = await getSelf();
  const otheruser = await sql`select * from user_ where user_.id = ${id}`;
  if (otheruser.length == 0) {
    throw new Error("User not Found");
  }
  if (otheruser[0].id === self.id) {
    throw new Error("Cannot Unfollow Yourself");
  }
  console.log(otheruser);
  const existingFollow =
    await sql`select * from follow where followerId = ${self.id} and followingId = ${otheruser[0].id} `;
  console.log(existingFollow.length);
  if (existingFollow.length == 0) {
    throw new Error("Already not Following");
  }
  console.log(existingFollow.length);
  await sql`delete from follow where  followerId = ${self.id} and followingId = ${otheruser[0].id}`;
  return otheruser[0].username;
};
