import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import Db from "../../db/route";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);
export async function POST(req: Request) {
  const body = await req.text();
  const sql = await Db();
  const headerPayload = headers();
  const authorization = headerPayload.get("Authorization");
  if (!authorization) {
    return new Response("No authorization header", {
      status: 400,
    });
  }
  const event = receiver.receive(body, authorization);
  console.log(event.ingressInfo?.ingressId);
  if (
    event.event === "ingress_started" &&
    event.ingressInfo?.ingressId != undefined
  ) {
    await sql`update stream set islive=true where ingressid=${event.ingressInfo?.ingressId}`
      .then((rs) => console.log(rs))
      .catch((err) => console.log(err));
  }
  if (
    event.event === "ingress_ended" &&
    event.ingressInfo?.ingressId != undefined
  ) {
    await sql`update stream set islive=false where ingressid=${event.ingressInfo?.ingressId}`
      .then((rs) => console.log(rs))
      .catch((err) => console.log(err));
  }
  return new Response("", {
    status: 200,
  });
}
