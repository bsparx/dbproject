import AddQuestionToExam from "@/components/AddQuestionsToExam";
import { prisma } from "@/utils/db";
import { getUser } from "@/utils/user";
import { redirect } from "next/navigation";

export default async function page({ params }) {
  const { quizId } = await params;
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
  const authority = quiz.course.teacher_id === user_id;
  if (!authority) {
    redirect("/access-denied");
  }
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 underline mb-6">
        Quiz for {quiz.course.name}
      </h1>
      <h2 className="text-2xl font-semibold mb-4">{quiz.name}</h2>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <AddQuestionToExam
          topics={quiz?.course.topics}
          exam_id={Number(quizId)}
        />
      </div>
    </div>
  );
}
