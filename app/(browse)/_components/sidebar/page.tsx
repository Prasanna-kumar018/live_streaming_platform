import { getRecommended } from "@/lib/recommended_service";
import Recommended, { RecommendedSkeleton } from "../recommended";
import Toggle, { ToggleSkeleton } from "../toggle";
import { Wrapper } from "./wrapper";
import { getFollowedUser } from "@/lib/follow_service";
import Following, { FollowingSkeleton } from "../following";
import { getFollowersById, getLiveArray } from "@/lib/auth_service";
import { isBlockedBySelf, isBlockedByUser } from "@/lib/block_service";

const Sidebar = async () => {
  const recommended = await getRecommended();
  const followedUser = await getFollowedUser();
  const set: Set<string> = new Set();
  for (let i = 0; i < followedUser.length; i++)
  {
     set.add(followedUser[i].followingid);
  }  
  const res: Record<string, any>[] = [];
  const getFollowedUserByUserId = await getFollowersById(followedUser)
  for (let i = 0; i < recommended.length; i++)
  {
    const isBlockedbyUser_ = await isBlockedByUser(recommended[i].id);
    if (!set.has(recommended[i].id)   && !isBlockedbyUser_)
    {
      res.push(recommended[i]);  
    }
  }
  console.log(res)
  const isLivearray = await getLiveArray(recommended);
  const isliveforfollowers = await getLiveArray(getFollowedUserByUserId);
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following
          data={getFollowedUserByUserId}
          isLivearr={isliveforfollowers}
        ></Following>
        <Recommended data={res} isLivearr={isLivearray} />
      </div>
    </Wrapper>
  );
};

export default Sidebar;

export const SidebarSkeleton = () => {
  return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60  h-full  bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <FollowingSkeleton/>
      <RecommendedSkeleton />
    </aside>
  );
};
