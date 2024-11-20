import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-10 text-center max-w-md w-full space-y-6 border border-gray-200">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          className="mx-auto text-red-500 w-24 h-24 animate-pulse"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <h1 className="text-5xl font-extrabold text-red-600 mb-4 tracking-tight">
          Access Denied
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          You do not have the necessary permissions to access this page. 
          Please contact your system administrator if this seems incorrect.
        </p>
        <Link href="/dashboard" className="block">
          <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg 
            hover:bg-blue-700 transition-all duration-300 ease-in-out 
            transform hover:-translate-y-1 hover:scale-105 
            shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
}