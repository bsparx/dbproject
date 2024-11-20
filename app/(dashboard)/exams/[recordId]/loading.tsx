import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden animate-pulse">
        <div className="p-8 bg-gradient-to-r from-blue-600 to-blue-400">
          <div className="h-10 bg-white/30 rounded-md w-64 mx-auto"></div>
        </div>
        <div className="p-8 space-y-6">
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
              className="bg-white border-2 border-blue-100 rounded-xl shadow-lg"
            >
              <div className="bg-blue-50 p-4 rounded-t-xl border-b border-blue-100">
                <div className="h-6 bg-gray-200 w-32 rounded-md"></div>
              </div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 w-full rounded-md"></div>
                <div className="h-4 bg-gray-200 w-5/6 rounded-md"></div>
                <div className="h-4 bg-gray-200 w-3/4 rounded-md"></div>
                <div className="h-32 bg-gray-100 w-full rounded-lg mt-4"></div>
              </div>
            </div>
          ))}
          <div className="h-12 bg-blue-300 w-full rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}