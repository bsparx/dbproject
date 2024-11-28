export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto animate-pulse">
        <header className="mb-10 text-center">
          <div className="h-12 bg-gray-300 w-3/4 mx-auto mb-4 rounded"></div>
          <div className="h-6 bg-gray-300 w-1/2 mx-auto rounded"></div>
        </header>

        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
              className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between"
            >
              <div className="w-full">
                <div className="h-6 bg-gray-300 w-3/4 mb-2 rounded"></div>
                <div className="h-4 bg-gray-300 w-1/2 mb-2 rounded"></div>
                <div className="h-4 bg-gray-300 w-2/3 rounded"></div>
              </div>
              <div className="h-10 bg-gray-300 w-24 ml-4 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}