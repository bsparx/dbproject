import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        
        <div className="grid gap-6">
          {[1, 2, 3].map((_, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-5 w-20" />
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}