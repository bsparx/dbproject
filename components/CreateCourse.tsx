"use client";

import { createCourse } from "@/utils/crud";
import { useActionState, useState } from "react";

export default function CreateCourse({ user }) {
  const [state, formAction, isPending] = useActionState(createCourse, {
    userId: user.user_id,
    message: null,
  });
  const [active, setActive] = useState(false);

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
      <button
        className="border w-full py-2 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
        onClick={() => setActive(!active)}
      >
        {!active ? "Create a Course" : "Close Form"}
      </button>

      {active ? (
        <form action={formAction} className="mt-6">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Enter the course name
          </label>
          <input
            className="border h-10 w-full rounded-lg px-3 mb-4 focus:ring-2 focus:ring-blue-400"
            type="text"
            name="name"
            required
          />
          <button
            className="w-full bg-blue-900 py-2 rounded-lg text-white font-semibold hover:bg-blue-700 transition"
          >
            Create Course
          </button>
          {state.message ? (
            <h1 className="text-green-600 mt-4">{state.message}</h1>
          ) : null}
          {isPending ? <h1 className="text-blue-600 mt-4">Creating course...</h1> : null}
        </form>
      ) : null}
    </div>
  );
}
