// page.js
import EditBufferQuestion from "@/components/EditBufferQuestion";
import EditQuestion from "@/components/EditQuestion";
import { prisma } from "@/utils/db";
import { getUser } from "@/utils/user";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function page({ params }) {
  const user = await getUser();
  const { questionId } = params;
  const question = await prisma.bufferQuestions.findUniqueOrThrow({
    where: {
      question_id: Number(questionId),
    },
    include: {
      topic: {
        include: {
          course: true,
        },
      },
    },
  });

  const teacher = question.topic.course.teacher_id;
  if (teacher !== user.user_id) {
    redirect("/access-denied");
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Suspense
        fallback={<p className="text-center text-gray-600">Loading...</p>}
      >
        <EditBufferQuestion question={question} />
      </Suspense>
    </div>
  );
}