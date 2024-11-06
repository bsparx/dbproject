// loading.tsx

export default function Loading() {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-12 animate-pulse">
        {/* Page Title Loading */}
        <div className="w-1/2 h-10 bg-blue-300 rounded-md mx-auto mb-6"></div>
  
        {/* Enrolled Courses Section */}
        <section>
          <div className="h-8 w-1/3 bg-gray-300 rounded-md mb-4"></div>
          <ul className="space-y-3">
            {[1, 2, 3].map((_, index) => (
              <li
                key={index}
                className="h-6 bg-gray-200 rounded-md w-3/4"
              ></li>
            ))}
          </ul>
        </section>
  
        {/* Available Courses Section */}
        <section className="mt-24">
          <div className="h-6 w-1/3 bg-gray-300 rounded-md mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="h-10 w-full bg-blue-200 rounded-md"
              ></div>
            ))}
          </div>
        </section>
      </div>
    );
  }
  