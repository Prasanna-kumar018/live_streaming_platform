import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import Db from "../../db/route";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to env."
    );
  }
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
  console.log(svix_id, svix_signature, svix_timestamp);
  if (!svix_id || !svix_signature || !svix_timestamp) {
    return new Response("Error Occured - No svix headers ", {
      status: 400,
    });
  }
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let msg;
  try {
    msg = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook: ", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const { id } = msg.data;
  const eventType = msg.type;
  console.log(`Webhook with and ID of ${id} and type ${eventType} `);
  console.log("Webhook body ", payload.data);
  if (eventType === "user.created") {
    const sql = await Db();
    const uid = uuidv4();
    const streamUid = uuidv4();
    const bio = payload.data.bio === null ? "NULL" : payload.data.bio;

    await sql`insert into user_(id,username,imageUrl,externalUserId,bio,createdAt,updatedAt,stream) values(${uid},${
      payload.data.username
    }
          ,${
            payload.data.image_url == null
              ? "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
              : payload.data.image_url
          },${payload.data.id},${bio},now(),now(),${streamUid})`;
    console.log(streamUid);
    await sql`insert into stream(id,name,userId,isChatEnabled,isChatDelayed,isChatFollowersOnly)  values(${streamUid},${
      payload.data.username + `'s stream`
    },${uid},true,false,false)`;
    console.log(streamUid);
    console.log("User created Successfully");
  } else if (eventType === "user.updated") {
    const sql = await Db();
    const s =
      await sql`select * from user_  where externalUserId= ${payload.data.id}`;
    console.log(s);
    if (s.length == 0) {
      return new Response("User not Found", {
        status: 404,
      });
    }
    await sql`update user_ set username=${payload.data.username} , 
        imageUrl = ${payload.data.image_url} , updatedAt = now()  where externalUserId=${payload.data.id} `;
    console.log("User Updated Successfully");
  }
  if (eventType === "user.deleted") {
    const sql = await Db();
    const s =
      await sql`select * from user_  where externalUserId= ${payload.data.id}`;
    console.log(s);
    if (s.length == 0) {
      return new Response("User not Found", {
        status: 404,
      });
    }
    await sql`delete from user_ where externalUserId=${payload.data.id} `;
    console.log("User Deleted Successfully");
  }
  return new Response("", {
    status: 200,
  });
}
