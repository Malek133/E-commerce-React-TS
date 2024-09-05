import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDashboard() {
  return (
    <div className="flex  space-y-3">
      <Skeleton className="h-[525px] w-[950px] rounded-xl" />
      {/* <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div> */}
    </div>
  )
}
