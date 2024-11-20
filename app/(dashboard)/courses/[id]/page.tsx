import AddTopic from "@/components/AddTopic";
import AttemptQuiz from "@/components/AttemptQuiz";
import NewExam from "@/components/NewExam";
import { prisma } from "@/utils/db";
import { getUser } from "@/utils/user";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page({ params }) {
  const { id } = await params;
  const user = await getUser();

  const course = await prisma.course.findUniqueOrThrow({
    where: {
      course_id: Number(id),
    },
    include: {
      exams: true,
      topics: true,
    },
  });

  if (user.user_id !== course.teacher_id) {
    const checkEnrolled = await prisma.enrollment.findFirst({
      where: { student_id: user.user_id, course_id: Number(id) },
    });
    if (checkEnrolled === null) {
      redirect(`/enrollment-error`);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-extrabold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 mb-2">
            {course.name}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full mb-8" />
          <h2 className="font-bold text-2xl md:text-3xl text-gray-700">Course Topics</h2>
        </div>

        {user.user_id === course.teacher_id && (
          <div className="mb-8">
            <AddTopic course={course} />
          </div>
        )}

        <div className="grid gap-4 mb-16">
          {course.topics.map((topic) => (
            <div key={topic.topic_id}>
              <Link href={`/courses/${id}/${topic.topic_id}`}>
                <button className="w-full bg-white hover:bg-gray-50 text-gray-700 py-4 px-6 rounded-xl transition duration-300 shadow-sm hover:shadow-md border border-gray-100 group">
                  <div className="flex items-center justify-between">
                    <span className="font-medium group-hover:text-blue-600 transition-colors">
                      {topic.name}
                    </span>
                    <svg 
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </Link>
            </div>
          ))}
        </div>

        <div className="relative mb-8">
          <h2 className="font-bold text-2xl md:text-3xl text-center text-gray-700 mb-8">
            Mock Exams
          </h2>
          <div className="absolute inset-x-0 -bottom-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        {user.user_id === course.teacher_id && (
          <div className="mt-8 mb-12">
            <NewExam course_id={Number(id)} />
          </div>
        )}

        <div className="space-y-4">
          {course.exams.map((exam) => (
            <div key={exam.exam_id} className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex-grow">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-lg font-medium">
                  <div className="flex items-center justify-between">
                    <span>{exam.name}</span>
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                      Difficulty: {exam.average_difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                {user.user_id === course.teacher_id && (
                  <Link href={`/quiz/${exam.exam_id}`}>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg transition duration-200 font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  </Link>
                )}
                <AttemptQuiz student_id={user.user_id} exam_id={exam.exam_id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}