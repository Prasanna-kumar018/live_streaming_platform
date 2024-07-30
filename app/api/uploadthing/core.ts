import { getSelf } from "@/lib/auth_service";
import { metadata } from "./../../layout";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import Db from "../db/route";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const self = await getSelf();
      return { user: self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const sql = await Db();
      await sql`update stream set 
            thumbnailurl=${file.url} where userid=${metadata.user.id}`
        .then((res) => console.log(res))
            .catch((err) => console.log(err));
        return {fileUrl:file.url}
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
