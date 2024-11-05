// app/access-denied/page.js

import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-700 mb-8">
        You do not have permission to view this page.
      </p>
      <Link href="/dashboard" passHref>
        <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
          Return to Home
        </button>
      </Link>
    </div>
  );
}
