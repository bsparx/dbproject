import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex flex-col items-center justify-center space-y-10">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <h1 className="font-extrabold text-5xl text-blue-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-900">
            Loading Course
          </h1>
        </div>
        <h2 className="font-semibold text-2xl text-gray-600 tracking-wide animate-pulse">
          Preparing Topics & Exams
        </h2>
      </div>

      {/* Topics Loading Placeholder */}
      <div className="w-full max-w-xl bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-100/50">
        <h3 className="font-bold text-2xl text-blue-900 mb-6 flex items-center">
          <span className="mr-3">📚</span> Topics
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((_, index) => (
            <div 
              key={index} 
              className="w-full bg-blue-200/50 h-12 rounded-xl transition-all duration-300 hover:bg-blue-200/70 animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Exams Loading Placeholder */}
      <div className="w-full max-w-xl bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-100/50">
        <h3 className="font-bold text-2xl text-blue-900 mb-6 flex items-center">
          <span className="mr-3">📝</span> Mock Exams
        </h3>
        <div className="space-y-4">
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-blue-100/50 p-3 rounded-xl transition-all duration-300 hover:bg-blue-100/70"
            >
              <div className="w-full bg-blue-300/50 h-12 rounded-xl animate-pulse"></div>
              <div className="bg-green-400/60 h-12 w-24 rounded-xl animate-pulse"></div>
              <div className="bg-blue-500/50 h-12 w-28 rounded-xl animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}