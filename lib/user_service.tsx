import Db from "@/app/api/db/route";
export const getUserByUserName = async (username: string) => {
  const sql = await Db();
  const user =
    await sql`select * from user_ where user_.username = ${username}`;

  return user;
};
export const getUserBYId = async (id: string) => {
  console.log(id);
  const sql = await Db();
  const user = await sql`select * from user_ where user_.id = ${id}`;
  return user;
};

export const setlive = async (id: string) => {
  const sql = await Db();
  await sql`update stream set islive=${true} where userid=${id}`
    .then(() => console.log("success"))
    .catch((err) => console.log(err));
};
export const unsetlive = async (id: string) => {
  const sql = await Db();
  await sql`update stream set islive=${false} where userid=${id}`
    .then(() => console.log("success"))
    .catch((err) => console.log(err));
};
