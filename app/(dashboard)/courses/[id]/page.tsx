import AddTopic from "@/components/AddTopic";
import AttemptQuiz from "@/components/AttemptQuiz";
import NewExam from "@/components/NewExam";
import { prisma } from "@/utils/db";
import { getUser } from "@/utils/user";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function CoursePage({ params }) {
  const { id } = await params;
  const user = await getUser();

  const course = await prisma.course.findUnique({
    where: {
      course_id: Number(id),
    },
    include: {
      exams: {
        where:{
          created_by:'teacher'
        }
      },
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-extrabold text-5xl text-blue-900 mb-4 drop-shadow-lg">
            {course.name}
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore topics, take mock exams, and enhance your learning journey.
          </p>
        </div>

    
        <div className="flex justify-center mb-8">
          <Link href={`/courses/${id}/generateExam`}>
            <button className="
              flex items-center gap-3 
              bg-blue-600 text-white 
              px-6 py-3 
              rounded-xl 
              shadow-lg 
              hover:bg-blue-700 
              transition duration-300 
              transform hover:scale-105
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-400
            ">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
                />
              </svg>
              Generate Exam
            </button>
          </Link>
        </div>

        {/* Add Topic Section */}
        {user.user_id === course.teacher_id && (
          <div className="mb-12">
            <AddTopic course={course} />
          </div>
        )}

        {/* Topics Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-6">
            Course Topics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {course.topics.map((topic) => (
              <Link key={topic.topic_id} href={`/courses/${id}/${topic.topic_id}`}>
                <div className="
                  bg-white 
                  p-4 
                  rounded-xl 
                  shadow-md 
                  hover:shadow-lg 
                  transition 
                  duration-300 
                  transform 
                  hover:scale-105 
                  text-center
                  cursor-pointer
                ">
                  <span className="text-blue-800 font-semibold">
                    {topic.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
            Teachers' Mock Exams
          </h2>

          {user.user_id === course.teacher_id && (
            <div className="flex justify-center mb-8">
              <NewExam course_id={Number(id)} />
            </div>
          )}

          <div className="space-y-4">
            {course.exams.map((exam) => (
              <div 
                key={exam.exam_id} 
                className="
                  flex 
                  items-center 
                  bg-blue-50 
                  p-4 
                  rounded-xl 
                  shadow-md 
                  hover:shadow-lg 
                  transition 
                  duration-300
                "
              >
                <div className="flex-grow">
                  <div className="font-semibold text-blue-900">
                    {exam.name}
                  </div>
                  <div className="text-sm text-blue-600">
                    Difficulty: {exam.average_difficulty}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {user.user_id === course.teacher_id && (
                    <Link href={`/quiz/${exam.exam_id}`}>
                      <button className="
                        bg-green-500 
                        text-white 
                        px-4 py-2 
                        rounded-lg 
                        hover:bg-green-600 
                        transition 
                        duration-300
                      ">
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
    </div>
  );
}