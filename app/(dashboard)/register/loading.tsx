import React from 'react';
import { BookOpen, BookPlus, ChevronRight } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto space-y-12">
        {/* Elegant Page Title Loading */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <BookOpen className="w-10 h-10 text-blue-600 animate-bounce" />
          <div className="animate-pulse">
            <div className="h-10 w-64 bg-blue-300/70 rounded-xl mx-auto"></div>
          </div>
        </div>

        {/* Enrolled Courses Section */}
        <section className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-100/50">
          <div className="flex items-center mb-6">
            <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
            <div className="h-8 w-1/3 bg-gray-300/70 rounded-md animate-pulse"></div>
          </div>
          <ul className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <li 
                key={index} 
                className="flex items-center space-x-4 bg-blue-50 p-3 rounded-xl animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded-md w-3/4 flex-grow"></div>
                <ChevronRight className="w-5 h-5 text-blue-400 opacity-50" />
              </li>
            ))}
          </ul>
        </section>

        {/* Available Courses Section */}
        <section className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-100/50">
          <div className="flex items-center mb-6">
            <BookPlus className="w-6 h-6 mr-3 text-green-600" />
            <div className="h-6 w-1/3 bg-gray-300/70 rounded-md animate-pulse"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="h-16 w-full bg-blue-200/60 rounded-xl 
                           flex items-center px-4 
                           transition-all duration-300 
                           hover:bg-blue-200/80 
                           hover:shadow-md"
              >
                <div className="h-8 w-1/2 bg-blue-300/70 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Subtle Background Decoration */}
      <div className="fixed inset-0 -z-10 
        bg-gradient-to-br from-blue-50 via-white to-blue-100 
        opacity-50 pointer-events-none"></div>
    </div>
  );
}