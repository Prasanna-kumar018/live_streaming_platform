"use server"
import { blockUser, unblockUser } from "@/lib/block_service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    // todo disconnect live stream
    //allow ability to kick the guest...

  try {
      const followedUser: string = await blockUser(id);
      console.log(followedUser)
    revalidatePath("/");
    revalidatePath(`/${followedUser}`);
  } catch(err) {
    throw new Error("Internal Error");
  }
};

export const onUnblock = async (id: string) => {
  try {
    const followedUser: string = await unblockUser(id);
    revalidatePath("/");
    revalidatePath(`/${followedUser}`);
  } catch {
    throw new Error("Internal Error");
  }
};
