import {create} from 'zustand'
interface CreaterStore {
    collapsed: boolean,
    onExpand: () => void,
    onCollapse: ()=>void
}

export const useCreater = create<CreaterStore>((set) => ({
    collapsed: false,
    onExpand: () => set({ collapsed: false }),
    onCollapse: () => set({ collapsed: true })
}));