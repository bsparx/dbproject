"use client";

import { makeStudentExam } from "@/utils/crud";
import { useActionState } from "react";
import { useState } from "react";

export default function MakeExam({ topic, id }) {
  const [state, formAction, isPending] = useActionState(makeStudentExam, {
    topic: topic,
    course_id: id,
  });
  const [selectedDifficulty, setSelectedDifficulty] = useState({});

  const handleDifficultyChange = (topicId, value) => {
    setSelectedDifficulty((prev) => ({
      ...prev,
      [topicId]: value,
    }));
  };

  return (
    <div className="p-8">
      <form action={formAction} className="space-y-8">
        <div className="mb-6">
          <label 
            htmlFor="ExamName" 
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Exam Name
          </label>
          <input 
            type="text" 
            name="ExamName" 
            id="ExamName" 
            required 
            placeholder="Enter exam name"
            className="
              w-full 
              px-4 py-3 
              border-2 border-blue-200 
              rounded-lg 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-400 
              transition 
              duration-300
            "
          />
        </div>

        {topic.map((top) => {
          const minDifficulty = top.questions.reduce(
            (min, question) => (question.difficulty < min ? question.difficulty : min),
            +Infinity
          );
          const maxDifficulty = top.questions.reduce(
            (max, question) => (question.difficulty > max ? question.difficulty : max),
            -Infinity
          );

          return (
            top.questions.length !== 0 && (
              <div
                key={top.topic_id}
                className="
                  bg-blue-50 
                  rounded-xl 
                  p-6 
                  border-2 
                  border-blue-100 
                  shadow-md 
                  hover:shadow-xl 
                  transition 
                  duration-300
                "
              >
                <h2 className="text-2xl font-bold text-blue-800 mb-4">
                  {top.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor={`num-questions-${top.topic_id}`}
                      className="block text-md font-medium text-blue-900 mb-2"
                    >
                      Number of Questions 
                      <span className="text-sm text-blue-600 ml-2">
                        (Max: {top.questions.length})
                      </span>
                    </label>
                    <input
                      type="number"
                      id={`num-questions-${top.topic_id}`}
                      name={`questions-${top.topic_id}`}
                      min={0}
                      max={top.questions.length}
                      className="
                        w-full 
                        px-4 py-2 
                        border-2 border-blue-200 
                        rounded-lg 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-400
                      "
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`difficulty-${top.topic_id}`}
                      className="block text-md font-medium text-blue-900 mb-2"
                    >
                      Maximum Difficulty
                      <span className="text-sm text-blue-600 ml-2">
                        (Range: {minDifficulty} - {maxDifficulty})
                      </span>
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        id={`difficulty-${top.topic_id}`}
                        name={`difficulty-${top.topic_id}`}
                        min={minDifficulty}
                        max={maxDifficulty}
                        step="1"
                        value={selectedDifficulty[top.topic_id] || minDifficulty}
                        onChange={(e) =>
                          handleDifficultyChange(top.topic_id, e.target.value)
                        }
                        className="
                          w-full 
                          h-2 
                          bg-blue-200 
                          rounded-lg 
                          appearance-none 
                          cursor-pointer
                        "
                      />
                      <span className="text-blue-800 font-semibold w-10 text-center">
                        {selectedDifficulty[top.topic_id] || minDifficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          );
        })}

        <div className="pt-6">
          <button
            type="submit"
            disabled={isPending}
            className="
              w-full 
              bg-blue-600 
              hover:bg-blue-700 
              text-white 
              py-3 
              px-4 
              rounded-lg 
              font-bold 
              text-lg 
              transition 
              duration-300 
              transform 
              hover:scale-105
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-400
              disabled:opacity-50
              disabled:cursor-not-allowed
              flex 
              items-center 
              justify-center 
              gap-2
            "
          >
            {isPending ? (
              <>
                <svg 
                  className="animate-spin h-5 w-5" 
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
                Generating Exam...
              </>
            ) : (
              "Create Exam"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}