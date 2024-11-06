// loading.tsx

export default function Loading() {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
        <div className="text-center mb-10 animate-pulse">
          <h1 className="font-extrabold text-4xl text-blue-900 underline">
            Loading Course...
          </h1>
          <h2 className="font-bold text-3xl text-gray-500 mt-4">
            Fetching Topics & Exams
          </h2>
        </div>
  
        {/* Topics Loading Placeholder */}
        <div className="w-full max-w-lg mb-16">
          <h2 className="font-bold text-3xl text-gray-500 mb-4 animate-pulse">
            Topics
          </h2>
          <div className="grid gap-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="w-full bg-gray-400/40 h-10 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
  
        {/* Exams Loading Placeholder */}
        <div className="w-full max-w-lg">
          <h2 className="font-bold text-3xl text-gray-500 mb-4 animate-pulse">
            Mock Exams
          </h2>
          <div className="space-y-6">
            {[1, 2].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 animate-pulse"
              >
                <div className="w-full bg-blue-700/30 h-10 rounded-xl"></div>
                <div className="bg-green-600/40 h-10 w-24 rounded-xl"></div>
                <div className="bg-gray-400/40 h-10 w-28 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  