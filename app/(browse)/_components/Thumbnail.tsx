"use client";
import UserAvatar from "./useavatar";
import "../../../app/globals.css";
import Image from "next/image";
interface props {
  src: string | null;
  fallback: string;
  isLive: boolean;
  username: string;
}

const Thumbnail = ({ fallback, isLive, src, username }: props) => {
  console.log(fallback, isLive, src);
  let content;
  if (!src) {
    content = (
      <div
        className="bg-[#262626]   flex flex-col items-center justify-center gap-y-4
             transition-transform h-full w-full group-hover:translate-x-2 group-hover:-translate-y-1 rounded-md"
      >
        <UserAvatar
          size="lg"
          username={username}
          imageUrl={fallback}
          isLive={isLive}
          showBadge
        />
      </div>
    );
  } else {
    content = <Image src={src} fill alt="Thumbnail" className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"></Image>;
  }
  console.log(content);
  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <div
        className="rounded-md absolute inset-0 bg-blue-600 opacity-0 
        group-hover:opacity-100 transition-opacity flex items-center justify-center "
      />
        {content}
    </div>
  );
};

export default Thumbnail;
