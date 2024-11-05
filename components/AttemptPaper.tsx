// AttemptPaper.js
"use client";

import { gradeTheExam } from "@/utils/crud";
import { useActionState } from "react";

export default function AttemptPaper({ ExamQuestions, record_id }) {
  const [state, formAction, isPending] = useActionState(gradeTheExam, {
    ExamQuestions: ExamQuestions,
    record_id,
  });

  return (
    <form action={formAction} className="space-y-6">
      {ExamQuestions.map((questions, index) => {
        return (
          <div
            key={questions.question_id}
            className="border p-6 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-lg font-bold mb-2">Question {index + 1}</h2>
            <p className="text-gray-700 mb-4">{questions.question.text}</p>

            <label
              htmlFor={`answer_${questions.question_id}`}
              className="block text-gray-600 mb-2"
            >
              Write Your Answer:
            </label>
            <textarea
              name={`${questions.question_id}answer`}
              id={`answer_${questions.question_id}`}
              className="w-full h-32 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        );
      })}

      <button
        type="submit"
        className="w-full py-2 mt-4 text-white bg-green-600 hover:bg-green-500 rounded-lg font-semibold transition"
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>

      {state?.message && (
        <p className="text-center text-green-600 font-semibold mt-4">
          {state.message}
        </p>
      )}
    </form>
  );
}
