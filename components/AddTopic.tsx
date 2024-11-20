"use client";

import { addTopic } from "@/utils/crud";
import { useActionState, useState } from "react";

export default function AddTopic({ course }) {
  const [active, setActive] = useState(false);
  const [state, formAction, isPending] = useActionState(addTopic, {
    courseId: course.course_id,
    message: null,
  });

  return (
    <div className="w-full max-w-xl mx-auto transform transition-all duration-300">
      <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${active ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
        <button
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 flex items-center justify-center gap-2"
          onClick={() => setActive(!active)}
        >
          <span>{active ? "Close Form" : "Create a New Topic"}</span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${active ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`transition-all duration-300 ease-in-out ${active ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
          <form action={formAction} className="p-8">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-3 text-lg">
              Topic Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter topic name..."
              className="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-800 text-lg mb-6"
            />
            <button className="w-full bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white font-semibold py-3 px-6 rounded-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg">
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating...
                </span>
              ) : (
                "Add Topic"
              )}
            </button>
            {state?.message && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 font-medium text-center">Topic created successfully!</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}