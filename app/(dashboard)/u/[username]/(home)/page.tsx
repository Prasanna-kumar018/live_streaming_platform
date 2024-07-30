import StreamPlayer from "@/components/stream_player";
import { getStreamByUserId } from "@/lib/stream_service";
import { getUserByUserName } from "@/lib/user_service";
import { currentUser } from "@clerk/nextjs/server";
interface creatorProps {
  params: {
    username: string;
  };
}
const CreaterPage = async ({ params }: creatorProps) => {
  const externalUser = await currentUser();
  console.log(params.username)
  const user = await getUserByUserName(params.username);
  console.log(user);
  if (user.length == 0 || user[0].externaluserid !== externalUser?.id) {
    throw new Error("UnAuthorized");
  }
  const stream = await getStreamByUserId(user[0].id);
  console.log(stream)
  if (stream.length == 0) 
    throw new Error("UnAuthorized");
  return <div className="h-full">
    <StreamPlayer  user={user[0]} stream={stream[0]} isFollowing={true} />
  </div>;
};

export default CreaterPage;
