'use client'
import { useState } from "react";
import { addQuestion } from "@/utils/crud";
import { useActionState } from "react";

export default function AddQuestion({ topicid, course_id }) {
  const [state, formAction, isPending] = useActionState(addQuestion, {
    courseId: course_id,
    topic_id: topicid,
    message: null,
  });
  const [active, setActive] = useState(false);
  const [difficulty, setDifficulty] = useState(5);

  const handleDifficultyChange = (e) => setDifficulty(e.target.value);

  return (
    <div className="mb-8">
      <button
        className="border px-10 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-400 transition"
        onClick={() => setActive(!active)}
      >
        {active ? "Hide Form" : "Create a New Question"}
      </button>

      {active && (
        <form
          action={formAction}
          className="mt-6 p-4 border rounded-lg bg-gray-50"
        >
          <div className="mb-4">
            <label htmlFor="question" className="font-semibold text-gray-700">
              Enter your question
            </label>
            <textarea
              id="question"
              name="text"
              rows={4}
              className="w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Write your question here"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="answer" className="font-semibold text-gray-700">
              Write the answer for the given question
            </label>
            <textarea
              id="answer"
              name="correct_answer"
              rows={4}
              className="w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Write answer here"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="difficulty" className="font-semibold text-gray-700">
              Enter the difficulty of the question:
            </label>
            <input
              type="range"
              id="difficulty"
              name="difficulty"
              min="1"
              max="10"
              value={difficulty}
              onChange={handleDifficultyChange}
              className="mt-2 w-full"
              required
            />
            <div className="text-center font-semibold text-gray-700">
              Difficulty: {difficulty}
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
            {isPending ? "Creating..." : "Create Question"}
          </button>
          {state?.message && (
            <p className="text-green-600 font-semibold mt-2">
              Created Question!
            </p>
          )}
        </form>
      )}
    </div>
  );
}
