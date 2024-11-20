import React from 'react';
import { BarChart3, FileText, Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Animated Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <FileText className="w-10 h-10 text-blue-600 animate-pulse" />
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900">
              Loading Reports
            </h1>
          </div>
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>

        {/* Latest Records Grid */}
        <section className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-100/50">
          <div className="flex items-center mb-6">
            <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-2xl font-semibold text-blue-900">
              Latest Records
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-blue-100/50 shadow-md rounded-xl p-5 
                           transition-all duration-300 
                           hover:bg-blue-100/70 
                           hover:shadow-xl 
                           animate-pulse"
              >
                <div className="space-y-3">
                  <div className="h-4 bg-blue-300/70 rounded-md"></div>
                  <div className="h-4 bg-blue-300/70 rounded-md"></div>
                  <div className="h-4 bg-blue-300/70 rounded-md"></div>
                  <div className="h-3 w-2/3 bg-blue-200/70 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Performance Overview */}
        <section className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-100/50">
          <div className="flex items-center mb-6">
            <BarChart3 className="w-6 h-6 mr-3 text-green-600" />
            <h2 className="text-2xl font-semibold text-blue-900">
              Performance Overview
            </h2>
          </div>
          <div className="bg-blue-100/50 shadow-md rounded-xl p-6 h-96 
                          flex items-center justify-center
                          animate-pulse">
            <div className="w-full h-full bg-blue-300/70 rounded-xl"></div>
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