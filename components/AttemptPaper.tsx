"use client";

import { gradeTheExam } from "@/utils/crud";
import { useActionState } from "react";

export default function AttemptPaper({ ExamQuestions, record_id }) {
  const [state, formAction, isPending] = useActionState(gradeTheExam, {
    ExamQuestions: ExamQuestions,
    record_id,
  });

  return (
    <form action={formAction} className="space-y-8">
      {ExamQuestions.map((questions, index) => {
        return (
          <div
            key={questions.question_id}
            className="bg-white border-2 border-blue-100 rounded-xl shadow-lg transition-all hover:shadow-2xl hover:border-blue-200"
          >
            <div className="bg-blue-50 p-4 rounded-t-xl border-b border-blue-100">
              <h2 className="text-xl font-bold text-blue-800">
                Question {index + 1}
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4 text-base leading-relaxed">
                {questions.question.text}
              </p>

              <label
                htmlFor={`answer_${questions.question_id}`}
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Write Your Answer:
              </label>
              <textarea
                name={`${questions.question_id}answer`}
                id={`answer_${questions.question_id}`}
                className="w-full h-40 p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ease-in-out duration-300 resize-y placeholder-gray-400"
                placeholder="Type your answer here..."
                minLength={10}
                required
              />
            </div>
          </div>
        );
      })}

      <div className="text-center">
        <button
          type="submit"
          disabled={isPending}
          className="w-full max-w-md mx-auto py-3 px-6 text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <div className="flex items-center justify-center space-x-2">
              <svg 
                className="animate-spin h-5 w-5 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Submitting...</span>
            </div>
          ) : (
            "Submit Exam"
          )}
        </button>
      </div>

      {state?.message && (
        <div className="mt-6 text-center">
          <p className="text-green-600 font-semibold bg-green-50 border border-green-200 rounded-lg py-3 px-4 inline-block">
            {state.message}
          </p>
        </div>
      )}
    </form>
  );
}