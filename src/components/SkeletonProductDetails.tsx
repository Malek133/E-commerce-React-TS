import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemoDetails() {
  return (
    <>

     <div className="flex items-center justify-between">
        <div></div>

        <div>
        <Skeleton className="h-[450px] w-[380px]" />
       <div className="py-4">
        <Skeleton className="h-4 w-[380px]" />
        <Skeleton className="h-4 w-[380px] my-3" />
        </div>  
        </div>

        <div></div>

    </div>
    </>
   
  )
}