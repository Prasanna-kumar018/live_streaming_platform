import { setlive, unsetlive } from "@/lib/user_service";
import { create } from "zustand";
interface CreaterStore {
  islive: boolean;
  unsetlivefn: (hostIdentity:string) => void;
  setlivefn: (hostIdentity:string) => void;
}

export const useTemp = create<CreaterStore>((set) => ({
  islive: false,
  unsetlivefn: async (hostIdentity: string) => {
    await unsetlive(hostIdentity);
    set({ islive: false });
  },
  setlivefn: async (hostIdentity: string) => {
    await setlive(hostIdentity);
    set({ islive: true });
  },
}));
