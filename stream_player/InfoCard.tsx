"use client";

import { Pencil } from "lucide-react";
import Image from "next/image";
import InfoModal from "./InfoModal";
import { Separator } from "@/components/ui/separator";
import "../app/globals.css";
interface props {
  hostIdentity: string;
  viewerIdentity: string;
  name: string;
  thumbnailUrl: string;
}
const InfoCard = ({
  hostIdentity,
  name,
  thumbnailUrl,
  viewerIdentity,
}: props) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;
  return (
    <div className="px-4">
      <div className="rounded-xl bg-[#262626]">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
            <Pencil className="h-5 w-5"></Pencil>
          </div>
          <div className="ml-4">
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit your Stream Info
            </h2>
            <p className="text-[#ccc] text-xs lg:text-sm">
              Maximize your visibility
            </p>
          </div>
          <InfoModal initialName={name} initialThumbnailUrl={thumbnailUrl} />
        </div>
         <Separator/>
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-sm text-[#ccc] mb-2">Name</h3>
            <p className="text-sm font-semibold">{name}</p>
          </div>
          <div>
            <h3 className="text-sm text-[#ccc] mb-2">Thumbnail</h3>
            <p className="text-sm font-semibold">
              {thumbnailUrl && (
                <div
                  className="relative video rounded-md overflow-hidden w-[200px]
                          border border-white/10
                          "
                >
                  <Image fill src={thumbnailUrl} alt={name} className="object-cover"></Image>
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
