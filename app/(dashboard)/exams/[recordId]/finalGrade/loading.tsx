// loading.tsx
export default function Loading() {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 animate-pulse">
        <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
          {/* Header Placeholder */}
          <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-6"></div>
  
          {/* Question List Placeholder */}
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="p-6 bg-blue-50 rounded-lg shadow-md space-y-3"
              >
                <div className="h-6 bg-gray-300 rounded w-5/6"></div>
                <div className="h-5 bg-gray-300 rounded w-4/6"></div>
                <div className="h-5 bg-gray-300 rounded w-4/6"></div>
                <div className="h-5 bg-gray-300 rounded w-3/6"></div>
                <div className="h-5 bg-gray-300 rounded w-3/6"></div>
              </div>
            ))}
          </div>
  
          {/* Final Percentage Placeholder */}
          <div className="mt-8 text-center">
            <div className="h-6 bg-gray-300 rounded w-2/4 mx-auto mb-2"></div>
            <div className="h-5 bg-gray-300 rounded w-1/4 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }
  