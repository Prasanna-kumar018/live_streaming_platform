import { create } from "zustand";
export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}
interface ChatSidebarStore {
  collapsed: boolean;
  variant: ChatVariant;
  OnChangeVariant: (variant: ChatVariant) => void;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set({ collapsed: false }),
  variant: ChatVariant.CHAT,
  OnChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
  onCollapse: () => set({ collapsed: true }),
}));
