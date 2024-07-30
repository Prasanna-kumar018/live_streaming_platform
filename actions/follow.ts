"use server";

import { UnfollowUser, followUser } from "@/lib/follow_service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
  try {
    const followedUser:string =  await followUser(id);
    revalidatePath("/");
     revalidatePath(`/${followedUser}`);
     
  } catch {
    throw new Error("Internal Error");
  }
};

export const onUnfollow = async (id: string) =>
{
    try {
      const followedUser: string = await UnfollowUser(id);
      revalidatePath("/");
      revalidatePath(`/${followedUser}`);
    } catch {
      throw new Error("Internal Error");
    }
}