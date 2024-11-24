"use client";

import { useState } from "react";
import { deleteQuestion, editQuestion } from "@/utils/crud";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, ArrowLeft, AlertTriangle } from "lucide-react";

function EditBufferQuestion({ question }) {
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

  const getDifficultyColor = () => {
    if (difficulty <= 3) return "bg-green-100 text-green-800 border-green-200";
    if (difficulty <= 6) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <AlertTriangle className="mr-3 text-blue-500" size={24} />
          Edit Question
        </h2>
        
        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
              Question Text
            </label>
            <textarea
              id="question"
              name="text"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out placeholder-gray-400"
              defaultValue={question.text}
              placeholder="Enter your question here..."
              required
            />
          </div>

          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
              Answer
            </label>
            <textarea
              id="answer"
              name="correct_answer"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out placeholder-gray-400"
              defaultValue={question.correct_answer}
              placeholder="Enter the correct answer..."
              required
            />
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
              Question Difficulty
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                id="difficulty"
                name="difficulty"
                min="1"
                max="10"
                value={difficulty}
                onChange={handleDifficultyChange}
                className="flex-grow appearance-none h-2 bg-gray-200 rounded-full cursor-pointer"
              />
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor()}`}>
                {difficulty}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out disabled:opacity-50"
            >
              <Save className="mr-2" size={20} />
              {isPending ? "Updating..." : "Update Question"}
            </button>
            {state?.message && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-lg text-center">
                Question Updated Successfully!
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
        <form action={deleteAction} className="w-full">
          <button
            type="submit"
            disabled={deleteIsPending}
            className="w-full flex items-center justify-center py-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out disabled:opacity-50"
          >
            <Trash2 className="mr-2" size={20} />
            {deleteIsPending ? "Deleting..." : "Delete Question"}
          </button>
          {deleteState?.message && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-lg text-center mt-4">
              Question Deleted Successfully!
            </div>
          )}
        </form>

        <button
          onClick={() => router.back()}
          className="w-full flex items-center justify-center py-3 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 transition duration-300 ease-in-out"
        >
          <ArrowLeft className="mr-2" size={20} />
          Go Back
        </button>
      </div>
    </div>
  );
}

export default EditQuestion;