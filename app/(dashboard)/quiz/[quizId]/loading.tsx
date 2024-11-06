// loading.tsx

export default function Loading() {
    return (
      <div className="flex flex-col items-center p-6 animate-pulse">
        {/* Quiz Title Loading */}
        <div className="w-2/3 h-10 bg-blue-300 rounded-md mb-6"></div>
  
        {/* Quiz Subtitle Loading */}
        <div className="w-1/3 h-8 bg-gray-300 rounded-md mb-4"></div>
  
        {/* Content Container Loading */}
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          {/* "Add Question to Exam" Header Loading */}
          <div className="h-6 bg-gray-300 rounded-md w-1/2 mb-4"></div>
  
          {/* Loading Skeleton for Topics and Questions */}
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="w-full h-10 bg-gray-200 rounded-md"
              ></div>
            ))}
          </div>
  
          {/* "Add Question" Button Placeholder */}
          <div className="flex justify-end mt-6">
            <div className="w-32 h-10 bg-blue-300 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }
  