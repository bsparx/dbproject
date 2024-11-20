import Link from 'next/link';

export default function NotEnrolled() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-10 text-center max-w-md w-full space-y-6 border border-gray-200">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          className="mx-auto w-24 h-24 text-red-500 mb-6"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-red-600 mb-4 tracking-tight">
            Not Enrolled
          </h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            You are not currently enrolled in this course. 
            Please contact your instructor or complete the enrollment process to gain access.
          </p>
        </div>
        <Link href="/dashboard" className="block">
          <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg 
            hover:bg-blue-700 transition-all duration-300 ease-in-out 
            transform hover:-translate-y-1 hover:scale-105 
            shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}