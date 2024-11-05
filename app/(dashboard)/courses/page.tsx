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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="font-extrabold text-4xl text-blue-900 text-center mb-6">
        Your Courses
      </h1>

      {user.role === "teacher" ? (
        <div className="w-full flex justify-center mb-8">
          <CreateCourse user={user} />
        </div>
      ) : null}

      <div className="w-full max-w-md space-y-4">
        {courses.map((course) => (
          <Link href={`/courses/${course.course_id}`} key={course.course_id}>
            <button className="w-full bg-blue-800/80 text-white px-8 py-4 rounded-xl mt-5 transition duration-300 hover:bg-blue-700 shadow-md">
              <h1 className="text-lg font-semibold">
                {user.role === "teacher" ? course.name : course.course.name}
              </h1>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
