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
    <div className="mb-8 bg-white shadow-lg rounded-xl p-6">
      <button
        className="w-full flex items-center justify-center gap-2 border-2 border-blue-500 px-6 py-3 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 transition duration-300 ease-in-out transform hover:scale-[1.02]"
        onClick={() => setActive(!active)}
      >
        {active ? "Hide Form" : "Create a New Question"}
      </button>

      {active && (
        <form
          action={formAction}
          className="mt-6 p-6 border-2 border-blue-100 rounded-xl bg-blue-50/50 space-y-6"
        >
          <div>
            <label 
              htmlFor="question" 
              className="flex items-center gap-2 font-semibold text-gray-700 mb-2"
            >
              <span className="text-blue-500">?</span>
              Enter your question
            </label>
            <textarea
              id="question"
              name="text"
              rows={4}
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 bg-white"
              placeholder="Write your question here"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="answer" 
              className="flex items-center gap-2 font-semibold text-gray-700 mb-2"
            >
              <span className="text-green-500">✓</span>
              Write the answer for the given question
            </label>
            <textarea
              id="answer"
              name="correct_answer"
              rows={4}
              className="w-full p-3 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-300 bg-white"
              placeholder="Write answer here"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="difficulty" 
              className="flex items-center gap-2 font-semibold text-gray-700 mb-2"
            >
              <span className="text-yellow-500">★</span>
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
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              required
            />
            <div className="text-center font-semibold text-gray-700 mt-2 flex items-center justify-center gap-2">
              <span>Difficulty:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                difficulty > 7 ? "bg-red-100 text-red-700" : 
                difficulty >= 4 ? "bg-blue-100 text-blue-700" : 
                "bg-green-100 text-green-700"
              }`}>
                {difficulty}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-bold text-white uppercase tracking-wider transition duration-300 ease-in-out transform hover:scale-[1.02] shadow-md ${
              difficulty > 7
                ? "bg-red-500 hover:bg-red-600"
                : difficulty >= 4
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isPending ? "Creating..." : "Create Question"}
          </button>
          {state?.message && (
            <p className="text-green-600 font-semibold mt-2 text-center">
              Created Question!
            </p>
          )}
        </form>
      )}
    </div>
  );
}