import AddQuestionToExam from "@/components/AddQuestionsToExam";
import { prisma } from "@/utils/db";
import { getUser } from "@/utils/user";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const { quizId } = params;
  const { user_id } = await getUser();
  
  const quiz = await prisma.mockExam.findUnique({
    where: {
      exam_id: Number(quizId),
    },
    include: {
      course: {
        include: {
          topics: true,
        },
      },
    },
  });

  // Improved error handling
  if (!quiz) {
    redirect("/not-found");
  }

  const authority = quiz.course.teacher_id === user_id;
  if (!authority) {
    redirect("/access-denied");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          {quiz.course.name} Quiz
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700">
          {quiz.name}
        </h2>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <AddQuestionToExam
          topics={quiz?.course.topics}
          exam_id={Number(quizId)}
        />
      </div>
    </div>
  );
}