"use client";

import { makeExamAnswerRecord } from "@/utils/crud";
import { useActionState } from "react";

export default function AttemptQuiz({ exam_id, student_id }) {
  const [state, formAction, isPending] = useActionState(makeExamAnswerRecord, {
    exam_id,
    student_id,
  });

  return (
    <div >
      <form action={formAction}>
        <button className="bg-orange-500 text-white py-2 px-4 rounded-xl transition duration-200 hover:bg-orange-600 shadow-md">
          Attempt Quiz
        </button>
      </form>
      {isPending ? "Making the quiz for you..." : null}
    </div>
  );
}
