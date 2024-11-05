// EditQuestion.js
"use client";

import { useState } from "react";
import { deleteQuestion, editQuestion } from "@/utils/crud";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

export default function EditQuestion({ question }) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(editQuestion, {
    question_id: question.question_id,
    message: null,
  });
  const [deleteState, deleteAction, deleteIsPending] = useActionState(deleteQuestion, {
    question_id: question.question_id,
    message: null,
  });
  const [difficulty, setDifficulty] = useState(question.difficulty);

  const handleDifficultyChange = (e) => setDifficulty(e.target.value);

  return (
    <div className="space-y-8 p-6 bg-gray-50 border rounded-lg shadow-lg">
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-lg font-semibold text-gray-700">
            Enter your question
          </label>
          <textarea
            id="question"
            name="text"
            rows={4}
            className="w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            defaultValue={question.text}
            required
          />
        </div>

        <div>
          <label htmlFor="answer" className="block text-lg font-semibold text-gray-700">
            Write the answer for the given question
          </label>
          <textarea
            id="answer"
            name="correct_answer"
            rows={4}
            className="w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            defaultValue={question.correct_answer}
            required
          />
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-lg font-semibold text-gray-700">
            Enter the difficulty of the question
          </label>
          <input
            type="range"
            id="difficulty"
            name="difficulty"
            min="1"
            max="10"
            value={difficulty}
            onChange={handleDifficultyChange}
            className="w-full mt-2"
            required
          />
          <div className="text-center text-lg font-semibold text-gray-700 mt-2">
            Difficulty: <span className={difficulty >= 5 ? "text-red-500" : "text-green-600"}>{difficulty}</span>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded-lg font-semibold text-white transition ${
            difficulty > 7
              ? "bg-red-500 hover:bg-red-400"
              : difficulty >= 4
              ? "bg-blue-500 hover:bg-blue-400"
              : "bg-green-500 hover:bg-green-400"
          }`}
        >
          {isPending ? "Updating..." : "Update Question"}
        </button>
        {state?.message && <p className="text-green-600 font-semibold mt-2">Question Updated!</p>}
      </form>

      <form action={deleteAction}>
        <button
          type="submit"
          className="w-full py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-400 transition"
        >
          {deleteIsPending ? "Deleting..." : "Delete Question"}
        </button>
        {deleteState?.message && <p className="text-red-600 font-semibold mt-2">Question Deleted!</p>}
      </form>

      <button
        onClick={() => router.back()}
        className="w-full py-2 rounded-lg font-semibold text-white bg-purple-500 hover:bg-purple-400 transition"
      >
        Go Back
      </button>
    </div>
  );
}
