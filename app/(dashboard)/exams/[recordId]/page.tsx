// page.js
import AttemptPaper from "@/components/AttemptPaper";
import { prisma } from "@/utils/db";
import { getUser } from "@/utils/user";
import { redirect } from "next/navigation";

export default async function page({ params }) {
  const { recordId } = await params;
  const user = await getUser();

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
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Attempt Your Exam
      </h1>
      <AttemptPaper
        ExamQuestions={getQuestions?.exam.ExamQuestions}
        record_id={Number(recordId)}
      />
    </div>
  );
}
