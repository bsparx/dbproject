"use client";

import { createExam } from "@/utils/crud";
import { useActionState, useState } from "react";

export default function NewExam({ course_id }) {
  const [active, setActive] = useState(false);
  const [state, formAction, isPending] = useActionState(createExam, {
    course_id: course_id,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <button
        className="w-full py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition"
        onClick={() => setActive(!active)}
      >
        {active ? "Close Form" : "Create a new Mock Exam"}
      </button>
      
      {active && (
        <form action={formAction} className="mt-4">
          <label htmlFor="name" className="block font-semibold text-gray-700 mb-2">
            Mock Exam Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400"
            placeholder="Enter exam name"
          />
          <button className="w-full py-2 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 transition">
            Create Exam
          </button>
          {isPending && <h1 className="text-blue-600 mt-4">Creating a new Mock Exam...</h1>}
        </form>
      )}
    </div>
  );
}
