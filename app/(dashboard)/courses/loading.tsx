import React from 'react';
import { BookOpenIcon, SparklesIcon } from 'lucide-react';

export default function Loading() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex flex-col items-center justify-center p-4 overflow-hidden relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full blur-2xl animate-blob"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-400 rounded-full blur-2xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 text-center w-full max-w-md">
          {/* Header with Icons */}
          <div className="flex items-center justify-center mb-8 space-x-4">
            <BookOpenIcon 
              className="text-blue-900 animate-bounce" 
              size={48} 
              strokeWidth={1.5}
            />
            <h1 className="font-extrabold text-5xl text-blue-900 animate-gradient-text">
              Loading Courses
            </h1>
            <SparklesIcon 
              className="text-blue-900 animate-bounce animation-delay-2000" 
              size={48} 
              strokeWidth={1.5}
            />
          </div>

          {/* Skeleton Loaders */}
          <div className="space-y-6">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="w-full bg-white/20 backdrop-blur-lg border border-white/30 px-6 py-5 rounded-2xl shadow-xl transition transform hover:scale-[1.02] duration-300"
              >
                <div className="animate-pulse flex flex-col space-y-3">
                  <div className="h-8 bg-blue-800/30 rounded-lg w-3/4"></div>
                  <div className="h-5 bg-blue-800/20 rounded-lg w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="mt-8">
          <div className="w-24 h-2 bg-blue-800/30 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-blue-900 animate-progress-bar"></div>
          </div>
        </div>
      </div>
    );
}