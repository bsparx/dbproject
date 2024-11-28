import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden animate-pulse">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold text-center bg-blue-500 h-10 w-3/4 mx-auto rounded mb-4"></h1>
          <p className="text-center text-blue-100 mt-2 bg-blue-500 h-6 w-1/2 mx-auto rounded"></p>
        </div>
        
        <div className="p-6 space-y-6">
      
          <div className="space-y-4">
            <div className="bg-gray-200 h-12 w-full rounded"></div>
            <div className="bg-gray-200 h-12 w-full rounded"></div>
            <div className="bg-gray-200 h-12 w-full rounded"></div>
          </div>
          

          <div className="space-y-4 mt-6">
            <div className="bg-gray-200 h-10 w-3/4 rounded"></div>
            <div className="flex space-x-4">
              <div className="bg-gray-200 h-12 w-full rounded"></div>
              <div className="bg-gray-200 h-12 w-full rounded"></div>
              <div className="bg-gray-200 h-12 w-full rounded"></div>
            </div>
          </div>
          
     
          <div className="mt-6">
            <div className="bg-gray-200 h-12 w-full rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}