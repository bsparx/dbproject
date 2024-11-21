"use client";

import { makeExamAnswerRecord } from "@/utils/crud";
import { useActionState } from "react";

export default function AttemptQuiz({ exam_id, student_id }) {
  const [state, formAction, isPending] = useActionState(makeExamAnswerRecord, {
    exam_id,
    student_id,
  });

  return (
    <div>
      <form action={formAction}>
        <button 
          type="submit" 
          disabled={isPending}
          className="
            bg-orange-500 hover:bg-orange-600 
            text-white py-3 px-6 
            rounded-lg 
            transition duration-200 
            font-medium 
            flex items-center 
            gap-2 
            shadow-md 
            hover:shadow-lg 
            group
            disabled:opacity-50 
            disabled:cursor-not-allowed
          "
        >
          <svg 
            className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
            />
          </svg>
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
                />
              </svg>
              Preparing Quiz...
            </span>
          ) : (
            "Attempt Quiz"
          )}
        </button>
      </form>
    </div>
  );
}