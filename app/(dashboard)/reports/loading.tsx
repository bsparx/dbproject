// loading.tsx
export default function Loading() {
    return (
      <div className="max-w-5xl mx-auto p-8 space-y-12 animate-pulse">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-gray-300 mb-8">
          Loading Reports...
        </h1>
  
        {/* Placeholder for Latest Records */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-200 shadow-md rounded-lg p-4 h-36"
            >
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4"></div>
              <div className="h-3 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
  
        {/* Placeholder for Performance Overview */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            Performance Overview
          </h2>
          <div className="bg-gray-200 shadow-md rounded-lg p-6 h-64">
            <div className="h-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  