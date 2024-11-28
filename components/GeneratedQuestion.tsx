"use client";

import Link from "next/link";
import AddBufferQuestionToBank from "./AddBufferQuestionToBank";
import DeleteBufferQuestion from "./DeleteBufferQuestion";

export default function GeneratedQuestion({ question,id }) {
  return (
    <div
      key={question.question_id}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              question.difficulty < 5
                ? "bg-green-100 text-green-800"
                : question.difficulty > 4 && question.difficulty < 8
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            Difficulty: {question.difficulty}
          </span>
          <time className="text-sm text-gray-500 font-medium">
            {question.createdOn.toDateString()}
          </time>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-500">Question</p>
            <p className="text-gray-800 text-lg">{question.text}</p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-500 mb-2">Answer</p>
            <p className="text-gray-800 bg-gray-50 p-4 rounded-lg">
              {question.correct_answer}
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <AddBufferQuestionToBank bufferQuestion={question} id={id} />
            <Link
              href={`/bufferquestion/${question.question_id}`}
              className="px-4 py-2 bg-orange-100 text-gray-700 rounded-lg hover:bg-orange-200 transition-colors duration-200 font-medium flex items-center gap-2"
            >
              ✏️ Edit Question
            </Link>
            <DeleteBufferQuestion bufferQuestion={question} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
