
"use client";

import PropTypes from "prop-types";
import { registerForCourse } from "@/utils/crud";
import { useActionState } from "react";

export default function ReigsterCourseButton({ course, student_id }) {
  const [state, formAction, isPending] = useActionState(registerForCourse, {
    course_id: course.course_id,
    student_id,
  });

  return (
    <form action={formAction} className="inline">
      <button
        type="submit"
        onClick={formAction}
        className="border border-blue-600 text-blue-700 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
      >
        {isPending ? "Registering..." : `Register for ${course.name}`}
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
