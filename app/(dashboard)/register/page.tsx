import ReigsterCourseButton from "@/components/RegisterCourseButton";
import { prisma } from "@/utils/db";
import { getUnregisteredCourses, getUser } from "@/utils/user";

export default async function EnrollmentPage() {
  const user = await getUser();

  // If user is a teacher, redirect or show a message
  if (user.role === "teacher") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-8 space-y-12">
            <h1 className="text-center font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
              Course Registration
            </h1>
            <div className="flex flex-col items-center justify-center text-center space-y-6 bg-blue-50 p-12 rounded-xl shadow-md">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-24 w-24 text-purple-500 opacity-50" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                />
              </svg>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Course Registration Restricted
                </h2>
                <p className="text-gray-600 mb-6">
                  Teachers cannot register for courses. 
                  If you want to participate in a course, please switch to a student account.
                </p>
                <a 
                  href="/courses" 
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  Back to Courses
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fetch registered courses for students
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

  // Check if there are any courses in the database
  const totalCoursesCount = await prisma.course.count();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8 space-y-12">
          <h1 className="text-center font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
            Course Registration
          </h1>

          {totalCoursesCount === 0 ? (
            <div className="flex flex-col items-center justify-center text-center space-y-6 bg-blue-50 p-12 rounded-xl shadow-md">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-24 w-24 text-purple-500 opacity-50" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                />
              </svg>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  No Courses Available
                </h2>
                <p className="text-gray-600 mb-6">
                  Courses haven't been added to the system yet. Please contact your administrator.
                </p>
              </div>
            </div>
          ) : (
            <>
              <section className="bg-blue-50 p-6 rounded-xl shadow-md">
                <h2 className="text-left font-bold text-2xl mb-4 text-gray-800 border-b-2 border-blue-300 pb-2">
                  Courses You Are Enrolled In:
                </h2>
                {registered.length ? (
                  <ul className="space-y-3 pl-5">
                    {registered.map((registerCourse) => (
                      <li
                        key={registerCourse.course.course_id}
                        className="text-lg text-gray-700 bg-white p-3 rounded-lg shadow-sm flex items-center space-x-3"
                      >
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                        <span>{registerCourse.course.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic text-center py-4">
                    You aren't registered in any courses yet.
                  </p>
                )}
              </section>

              <section className="bg-gradient-to-tr from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg">
                <h2 className="font-bold text-2xl mb-4 text-gray-800 border-b-2 border-purple-300 pb-2">
                  Register for a Course:
                </h2>
                <div className="space-y-4 grid md:grid-cols-2 gap-4">
                  {unRegisteredCourses.length ? (
                    unRegisteredCourses.map((course) => (
                      <ReigsterCourseButton
                        key={course.course_id}
                        course={course}
                        student_id={user.user_id}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 italic text-center col-span-full py-4">
                      No courses available for registration.
                    </p>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}