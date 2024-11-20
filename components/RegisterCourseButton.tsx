"use client";

import PropTypes from "prop-types";
import { registerForCourse } from "@/utils/crud";
import { useActionState } from "react";

export default function ReigsterCourseButton({ course, student_id }) {
  const [state, formAction, isPending] = useActionState(registerForCourse, {
    course_id: course.course_id,
    student_id,
    message: null,
  });

  return (
    <form action={formAction} className="w-full">
      <button
        type="submit"
        disabled={isPending}
        className={`
          w-full 
          px-6 py-3 
          rounded-xl 
          font-semibold 
          transition-all 
          duration-300 
          flex 
          items-center 
          justify-center 
          space-x-2
          ${isPending 
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg'}
        `}
      >
        {state.message && (
          <span className="text-sm text-red-500 mr-2">{state.message}</span>
        )}
        <span>
          {isPending 
            ? "Registering..." 
            : `Register for ${course.name}`}
        </span>
        {!isPending && (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </form>
  );
}

ReigsterCourseButton.propTypes = {
  course: PropTypes.shape({
    course_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  student_id: PropTypes.number.isRequired,
};