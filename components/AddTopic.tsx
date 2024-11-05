"use client";

import { addTopic } from "@/utils/crud";
import { useActionState, useState } from "react";

export default function AddTopic({ course }) {
  const [active, setActive] = useState(false);
  const [state, formAction, isPending] = useActionState(addTopic, {
    courseId: course.course_id,
    message: null,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <button
        className="w-full py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
        onClick={() => setActive(!active)}
      >
        {active ? "Close Form" : "Create a new topic"}
      </button>
      
      {active && (
        <form action={formAction} className="mt-6">
          <label htmlFor="name" className="block font-semibold text-gray-700 mb-2">
            Enter the topic name
          </label>
          <input
            type="text"
            name="name"
            required
            className="border h-10 w-full rounded-lg px-4 mb-4 focus:ring-2 focus:ring-blue-400"
          />
          <button className="w-full py-2 bg-blue-800 text-white rounded-xl font-semibold hover:bg-blue-900 transition">
            Add Topic
          </button>
          {state?.message && <h1 className="text-green-600 mt-4">Created Topic!</h1>}
          {isPending && <h1 className="text-blue-600 mt-4">Creating...</h1>}
        </form>
      )}
    </div>
  );
}
