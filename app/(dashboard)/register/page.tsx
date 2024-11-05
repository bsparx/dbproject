// page.js
import ReigsterCourseButton from "@/components/RegisterCourseButton";
import { prisma } from "@/utils/db";
import { getUnregisteredCourses, getUser } from "@/utils/user";

export default async function page() {
  const user = await getUser();

  // Fetch registered courses
  const registered = await prisma.enrollment.findMany({
    where: {
      student_id: user.user_id,
    },
    include: {
      course: true,
    },
  });

  // Fetch courses the user hasn't registered for
  const unRegisteredCourses = await getUnregisteredCourses(user.user_id);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <h1 className="text-center font-bold text-5xl mb-6">Course Registration</h1>

      <section>
        <h2 className="text-left font-semibold text-2xl mb-4">Courses You Are Enrolled In:</h2>
        {registered.length ? (
          <ul className="list-disc pl-5 space-y-2">
            {registered.map((registerCourse) => (
              <li key={registerCourse.course.course_id} className="text-lg text-gray-700">
                {registerCourse.course.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You aren't registered in any course.</p>
        )}
      </section>

      <section className="mt-24">
        <h2 className="font-semibold text-xl mb-4">Register for a Course:</h2>
        <div className="space-y-4">
          {unRegisteredCourses.length ? (
            unRegisteredCourses.map((course) => (
              <ReigsterCourseButton
                key={course.course_id}
                course={course}
                student_id={user.user_id}
              />
            ))
          ) : (
            <p className="text-gray-500">No courses available for registration.</p>
          )}
        </div>
      </section>
    </div>
  );
}
