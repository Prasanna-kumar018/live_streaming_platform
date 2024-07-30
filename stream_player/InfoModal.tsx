"use client";
import { Button } from "@/components/ui/button";
import { ElementRef, useRef, useTransition } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import "../app/globals.css"
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { updateStream } from "@/lib/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import Hint from "@/app/(browse)/_components/Hint";
import { Trash } from "lucide-react";
import Image from "next/image";
interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}
const InfoModal = ({ initialThumbnailUrl, initialName }: InfoModalProps) => {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [thumbNailUrl, setthumbNailUrl] = useState(initialThumbnailUrl);
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success("Stream Updated");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something Went Wrong..."));
    });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"sm"} className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Stream info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2 mb-4">
            <Label>Name</Label>
            <Input
              placeholder={"Stream name"}
              onChange={onChange}
              value={name}
              disabled={false}
            ></Input>
          </div>
          <div className="space-y-2 mb-4">
            <Label>Thumbnail</Label>

            {thumbNailUrl ? (
              <div className="relative video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove thumbnail" side="left" asChild>
                    <Button
                      type="button"
                      disabled={isPending}
                      onClick={() => {}}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  alt="Thumbnail"
                  src={thumbNailUrl}
                  fill
                  className="object-cover"
                ></Image>
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted ">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#FFFFFF",
                    },
                    allowedContent: {
                      color: "#FFFFFF",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setthumbNailUrl(res?.[0]?.url);
                    router.refresh();
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button
                disabled={isPending}
                type="button"
                variant={"destructive"}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} variant={"custom"} type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
