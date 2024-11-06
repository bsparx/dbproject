// loading.tsx

export default function Loading() {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        {/* Title Loading */}
        <div className="mb-10 text-center animate-pulse">
          <div className="h-8 w-48 bg-gray-300 mx-auto rounded-md mb-2"></div>
          <div className="h-6 w-32 bg-blue-300 mx-auto rounded-md"></div>
        </div>
  
        {/* Add Question Button Loading */}
        <div className="animate-pulse w-full flex justify-center mb-8">
          <div className="h-10 w-36 bg-blue-400/50 rounded-md"></div>
        </div>
  
        {/* Questions Table Header Loading */}
        <div className="grid grid-cols-12 gap-3 px-3 mb-3 font-semibold text-gray-500">
          <div className="col-span-8 h-4 bg-gray-300 rounded-md"></div>
          <div className="col-span-2 h-4 bg-gray-300 rounded-md"></div>
          <div className="col-span-1 h-4 bg-gray-300 rounded-md"></div>
          <div className="col-span-1 h-4 bg-gray-300 rounded-md"></div>
        </div>
  
        {/* Questions List Loading */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-12 px-3 py-2 rounded-xl items-center border-2 border-gray-200 bg-gray-100 animate-pulse"
            >
              <div className="col-span-8 h-6 bg-gray-300 rounded-md"></div>
              <div className="col-span-2 h-6 bg-gray-300 rounded-md"></div>
              <div className="col-span-1 h-6 bg-gray-300 rounded-md"></div>
              <div className="col-span-1 h-6 bg-blue-300 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  