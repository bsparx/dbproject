import CreateCourse from "@/components/CreateCourse";
import { prisma } from "@/utils/db";
import { getUser, getYourCourses } from "@/utils/user";
import Link from "next/link";

export default async function CoursesPage() {
  const user = await getUser();
  let courses = [];
  if (user.role === "teacher") {
    courses = await prisma.course.findMany({
      where: {
        teacher_id: user.user_id,
      },
    });
  } else {
    courses = await getYourCourses(user.user_id);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 text-center mb-8">
          Your Courses
        </h1>

        {user.role === "teacher" && (
          <div className="w-full flex justify-center mb-12">
            <CreateCourse user={user} />
          </div>
        )}

        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center space-y-6 bg-white shadow-lg rounded-2xl p-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-blue-500 opacity-50"
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
                {user.role === "teacher"
                  ? "You haven't created any courses yet"
                  : "You're not enrolled in any courses"}
              </h2>
              <p className="text-gray-600 mb-6">
                {user.role === "teacher"
                  ? "Start by creating your first course"
                  : "Explore and enroll in courses that interest you"}
              </p>
              {user.role === "student" && (
                <Link
                  href={"/register"}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  Browse Courses
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
            {courses.map((course) => (
              <Link
                href={`/courses/${course.course_id}`}
                key={course.course_id}
              >
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-900 opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-8">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {user.role === "teacher"
                        ? course.name
                        : course.course.name}
                    </h2>
                    <div className="w-12 h-1 bg-blue-200 rounded group-hover:w-16 transition-all duration-300" />
                    <div className="mt-4 text-blue-100 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Click to view details →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
