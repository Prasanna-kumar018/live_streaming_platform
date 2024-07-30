import { isFollowingUser } from "@/lib/follow_service";
import { getUserByUserName } from "@/lib/user_service";
import { notFound } from "next/navigation";
import Actions from "../_components/Buttonactions";
import { getSelf } from "@/lib/auth_service";
import { isBlockedBySelf, isBlockedByUser } from "@/lib/block_service";

interface props {
  params: {
    usernameparam: string;
  };
}
const UserPage = async ({ params }: props) => {

  const user = await getUserByUserName(params.usernameparam);
  const self = await getSelf();
  console.log(self)
    if (user.length == 0 || !user) {
      notFound()
    }
  const main = user[0];
  const isFollowing = await isFollowingUser(main.id)
  const isBlockedbySelf = await isBlockedBySelf(main.id);
  const isBlockedbyUser_ = await isBlockedByUser(main.id);
  if (isBlockedbyUser_)
  {
    notFound();
  }
  return (
    <>
      <div className="flex flex-col gap-y-4 ">
        User: {main.username} Userid : {main.id}{" "}
      </div>
      <Actions
        isFollowing={isFollowing}
        isBlockedbySelf={isBlockedbySelf}
        selfId={self.id}
        userId={main.id}
        username={main.username}
      />
    </>
  );
};

export default UserPage;
