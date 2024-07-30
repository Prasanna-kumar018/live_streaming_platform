import { Skeleton } from "@/components/ui/skeleton"
import { ToggleCardSkeleton } from "../../_components/togglCard"

const Loading = () => {
  return (
      <div className="p-6 space-y-4">
          <Skeleton className="h-10 w-[200px]"/>
          <div className="space-y-7 ">
              <ToggleCardSkeleton />
              <ToggleCardSkeleton />
              <ToggleCardSkeleton />
          </div>
    </div> 
  )
}
export default Loading