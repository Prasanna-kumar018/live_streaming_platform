"use client"
import { cn } from "@/lib/utils";
import { useCreater } from "@/store/use_createrSidebar";
 
 

interface props{
    children: React.ReactNode
}
const Wrapper = ({ children }: props) => {
  const collapsed = useCreater((state) => state.collapsed);
 return (
   <aside
     className={cn(
       " fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-[#252731] border-r-2 border-t-2   border-[#2D2E35] z-50",
       {
         "lg:w-[70px]": collapsed,
       }
     )}
   >
     {children}
    
   </aside>
 );
}

export default Wrapper