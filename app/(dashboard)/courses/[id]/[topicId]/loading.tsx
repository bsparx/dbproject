import React from 'react';
import { PlusCircle, FileQuestion } from 'lucide-react';

export default function Loading() {
  return (
    <div className="p-8 max-w-5xl mx-auto bg-white/50 backdrop-blur-sm min-h-screen">
      {/* Elegant Title Loading */}
      <div className="mb-10 text-center">
        <div className="flex justify-center items-center space-x-3 mb-4">
          <FileQuestion className="w-10 h-10 text-blue-600" />
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-blue-200 mx-auto rounded-md mb-2"></div>
            <div className="h-5 w-32 bg-blue-300 mx-auto rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Add Question Button Loading */}
      <div className="w-full flex justify-center mb-8">
        <div className="animate-pulse flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full shadow-sm">
          <PlusCircle className="w-6 h-6 text-blue-400 opacity-50" />
          <div className="h-8 w-32 bg-blue-200 rounded-md"></div>
        </div>
      </div>

      {/* Questions Table Header Loading */}
      <div className="grid grid-cols-12 gap-3 px-3 mb-3 font-semibold text-gray-500">
        <div className="col-span-8 animate-pulse">
          <div className="h-4 bg-blue-200 rounded-md"></div>
        </div>
        <div className="col-span-2 animate-pulse">
          <div className="h-4 bg-blue-200 rounded-md"></div>
        </div>
        <div className="col-span-1 animate-pulse">
          <div className="h-4 bg-blue-200 rounded-md"></div>
        </div>
        <div className="col-span-1 animate-pulse">
          <div className="h-4 bg-blue-200 rounded-md"></div>
        </div>
      </div>

      {/* Questions List Loading */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-12 px-3 py-4 rounded-xl items-center border-2 border-blue-100 bg-blue-50/50 
                       transition-all duration-300 hover:shadow-md hover:border-blue-200"
          >
            <div className="col-span-8 space-y-2">
              <div className="h-5 bg-blue-200 rounded-md animate-pulse"></div>
              <div className="h-3 w-3/4 bg-blue-100 rounded-md animate-pulse"></div>
            </div>
            <div className="col-span-2 animate-pulse">
              <div className="h-6 bg-blue-200 rounded-md"></div>
            </div>
            <div className="col-span-1 animate-pulse">
              <div className="h-6 bg-blue-200 rounded-md"></div>
            </div>
            <div className="col-span-1 animate-pulse">
              <div className="h-6 bg-blue-300 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Background Subtle Decoration */}
      <div className="absolute inset-0 -z-10 
        bg-gradient-to-br from-blue-50 via-white to-blue-100 
        opacity-75"></div>
    </div>
  );
}