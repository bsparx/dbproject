// pages/not-enrolled.js

import Link from 'next/link';

export default function NotEnrolled() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4 text-red-600">
        You are not enrolled in this course
      </h1>
      <p className="text-gray-700 mb-6">
        Please contact your instructor or enroll in the course to access its content.
      </p>
      <Link href="/dashboard">
        <p className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Back to Dashboard
        </p>
      </Link>
    </div>
  );
}
