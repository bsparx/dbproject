import CreateCourse from "@/components/CreateCourse";
import { prisma } from "@/utils/db";
import { getUser, getYourCourses } from "@/utils/user";
import Link from "next/link";

export default async function page() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
          {courses.map((course) => (
            <Link href={`/courses/${course.course_id}`} key={course.course_id}>
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-900 opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {user.role === "teacher" ? course.name : course.course.name}
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
      </div>
    </div>
  );
}