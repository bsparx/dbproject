import AttemptPaper from "@/components/AttemptPaper";
import { prisma } from "@/utils/db";
import { getUser } from "@/utils/user";
import { isAlreadyChecked } from "@/utils/validation";
import { redirect } from "next/navigation";

export default async function page({ params }) {
  const { recordId } = await params;
  const user = await getUser();

  await isAlreadyChecked(recordId)
  // Check if the student is authorized to access the record
  const checkAuthenticity = await prisma.examAnswerRecord.findFirst({
    where: {
      student_id: user.user_id,
      record_id: Number(recordId),
    },
  });

  if (!checkAuthenticity) {
    redirect(`/access-denied`);
  }

  // Fetch the questions associated with the exam
  const getQuestions = await prisma.examAnswerRecord.findFirst({
    where: {
      record_id: Number(recordId),
    },
    include: {
      exam: {
        include: {
          ExamQuestions: {
            include: {
              question: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-blue-600 to-blue-400">
          <h1 className="text-3xl font-extrabold text-center text-white drop-shadow-md">
            Attempt Your Exam
          </h1>
        </div>
        <div className="p-8">
          <AttemptPaper
            ExamQuestions={getQuestions?.exam.ExamQuestions}
            record_id={Number(recordId)}
          />
        </div>
      </div>
    </div>
  );
}