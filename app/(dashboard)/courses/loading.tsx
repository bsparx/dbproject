// loading.tsx

export default function Loading() {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <h1 className="font-extrabold text-4xl text-blue-900 text-center mb-6 animate-pulse">
          Loading Your Courses...
        </h1>
  
        <div className="w-full max-w-md space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="w-full bg-blue-800/20 text-white px-8 py-4 rounded-xl mt-5 transition duration-300 shadow-md"
            >
              <div className="animate-pulse flex flex-col space-y-4">
                <div className="h-6 bg-blue-800/40 rounded w-3/4"></div>
                <div className="h-6 bg-blue-800/20 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  