import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center mb-4">
          <div className="h-6 w-6 bg-gray-300 rounded-full mr-3"></div>
          <div className="h-6 w-40 bg-gray-300 rounded"></div>
        </div>
        
        <div className="space-y-6">
          {/* Question Text Skeleton */}
          <div>
            <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="w-full h-24 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Answer Text Skeleton */}
          <div>
            <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="w-full h-24 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Difficulty Slider Skeleton */}
          <div>
            <div className="h-4 w-40 bg-gray-300 rounded mb-2"></div>
            <div className="flex items-center space-x-4">
              <div className="flex-grow h-2 bg-gray-200 rounded-full"></div>
              <div className="h-6 w-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Update Button Skeleton */}
          <div className="space-y-4">
            <div className="w-full h-12 bg-blue-300 rounded-lg"></div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
        {/* Delete and Go Back Button Skeletons */}
        <div className="w-full h-12 bg-red-300 rounded-lg"></div>
        <div className="w-full h-12 bg-purple-300 rounded-lg"></div>
      </div>

      {/* Centered Loading Indicator */}
      <div className="fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          <p className="mt-4 text-gray-600 font-semibold">Loading Question...</p>
        </div>
      </div>
    </div>
  );
}