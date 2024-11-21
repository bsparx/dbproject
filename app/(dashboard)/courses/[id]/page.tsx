import AddTopic from "@/components/AddTopic";
import AttemptQuiz from "@/components/AttemptQuiz";
import NewExam from "@/components/NewExam";
import { prisma } from "@/utils/db";
import { getUser } from "@/utils/user";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function page({ params }) {
  const { id } = await params;
  const user = await getUser();

  const course = await prisma.course.findUnique({
    where: {
      course_id: Number(id),
    },
    include: {
      exams: true,
      topics: true,
    },
  });
  if(!course){
    notFound()
  }
  if (user.user_id !== course.teacher_id) {
    const checkEnrolled = await prisma.enrollment.findFirst({
      where: { student_id: user.user_id, course_id: Number(id) },
    });
    if (checkEnrolled === null) {
      redirect(`/enrollment-error`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="text-center mb-10">
        <h1 className="font-extrabold text-4xl text-blue-900 underline">
          {course.name}
        </h1>
        <h2 className="font-bold text-3xl text-gray-700 mt-4">Topics</h2>
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
              <button className="w-full bg-gray-400 text-white py-2 rounded-xl transition duration-200 hover:bg-gray-500">
                {topic.name}
              </button>
            </Link>
          </div>
        ))}
      </div>

      <h2 className="font-bold text-3xl text-center text-gray-700 mt-16">
        Mock Exams
      </h2>

      {user.user_id === course.teacher_id && (
        <div className="mt-8 mb-8">
          <NewExam course_id={Number(id)} />
        </div>
      )}

      <div className="space-y-6">
        {course.exams.map((exam) => (
          <div key={exam.exam_id} className="flex items-center space-x-4">
            <div className="w-full bg-blue-700 text-white py-2 px-4 rounded-xl font-semibold shadow-md">
              {exam.name} - Difficulty: {exam.average_difficulty}
            </div>
            {user.user_id === course.teacher_id && (
              <Link href={`/quiz/${exam.exam_id}`}>
                <button className="bg-green-600 text-white py-2 px-4 rounded-xl transition duration-200 hover:bg-green-700 shadow-md">
                  Edit Exam
                </button>
              </Link>
            )}
            <AttemptQuiz student_id={user.user_id} exam_id={exam.exam_id} />
          </div>
        ))}
      </div>
    </div>
  );
}
