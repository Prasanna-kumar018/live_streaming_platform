"use client" 
import Link from "next/link";
import Thumbnail from "./Thumbnail";
import { LiveBadge } from "./live_badge";
import UserAvatar from "./useavatar";
interface props {
  data: Record<string, any>;
  user: Record<string, any>;
}
const ResultCard = ({ data, user }: props) => {
  console.log(data,user);
  return (
    <Link href={`/${user.username}`}>
      <div className="w-full h-full space-y-4">
        <Thumbnail
          src={data.thumbnailurl}
          fallback={user.imageurl}
          isLive={data.islive}
          username={user.username}
              />
              {data.islive && (
                  <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2
                  transition-transform">
                      <LiveBadge />
                  </div>
              )}
              <div className="flex gap-x-3">
                  <UserAvatar
                      username={user.username}
                      imageUrl={user.imageurl}
                      isLive={data.islive}
                  />
                  <div className="flex flex-col text-sm overflow-hidden">
                      <p className="truncate font-semibold hover:text-blue-500">
                          {data.name}
                      </p>
                      <p>{user.username}</p>
                  </div>
              </div>
          </div>
          
    </Link>
  );
};

export default ResultCard;
