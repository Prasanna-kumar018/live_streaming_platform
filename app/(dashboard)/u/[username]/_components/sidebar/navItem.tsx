"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCreater } from "@/store/use_createrSidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
interface props {
  label: string;
  icon: LucideIcon;
  href: string;
  isActive: boolean;
}
const NavItem = ({ icon:Icon, href, isActive, label }: props) => {
  const collapsed = useCreater((state) => state.collapsed);
  return (
    <Button
      asChild
      variant={"ghost"}
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
      >
          <Link href={href}>
              <div className="flex items-center gap-x-4">
                  <Icon className={cn("h-4 w-4 ", collapsed ? "mr-0" : "mr-2")} />
                  {!collapsed && (
                      <span>
                          {label}
                      </span>
                  )}
              </div> 
          </Link>
    </Button>
  );
};

export default NavItem;

export const NavItemSkeleton = () =>
{
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-[48px] min-w-[48px] rounded-md"/>
            <div className="flex-1 hidden lg:block">
                <Skeleton className="h-6 "/>
            </div>
        </li>
    )
    }
