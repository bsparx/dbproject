"use client";

import { generateQuestion } from "@/utils/crud";
import { useActionState } from "react";

export default function GenerateQuestions({ id, topicId }) {
  const [state, formAction, isPending] = useActionState(generateQuestion, {
    topicId,
    id,
  });

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label 
            htmlFor="input"
            className="block text-sm font-medium text-gray-700"
          >
            Please enter information regarding the questions you want to generate
          </label>
          <input
            type="text"
            name="input"
            id="input"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            required
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            className={`px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors ${
              isPending ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            disabled={isPending}
          >
            {isPending ? 'Generating...' : 'Generate Questions'}
          </button>
          
          {isPending && (
            <div className="text-sm text-gray-600 animate-pulse">
              This may take a moment...
            </div>
          )}
        </div>

        {state.comment && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-gray-700">
            {state.comment}
          </div>
        )}
      </form>
    </div>
  );
}