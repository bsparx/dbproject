'use client'
import React from 'react';
import { addBufferQuestionToBank } from "@/utils/crud";
import { useActionState } from "react";

export default function AddBufferQuestionToBank({ bufferQuestion, id }) {
  const [state, formAction, isPending] = useActionState(
    addBufferQuestionToBank,
    {
      id,
      bufferQuestion,
    }
  );
  
  return (
    <form action={formAction} className="flex-1">
      <button
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Adding to Bank...</span>
          </>
        ) : (
          <>
            <span className="text-lg">+</span>
            <span>Add to Question Bank</span>
          </>
        )}
      </button>
      {state.comment && (
        <p className="mt-2 text-sm text-center text-gray-600">{state.comment}</p>
      )}
    </form>
  );
}