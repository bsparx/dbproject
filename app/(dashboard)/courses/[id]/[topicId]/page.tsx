// page.js
import AddQuestion from "@/components/AddQuestion";
import { prisma } from "@/utils/db";
import { getUser } from "@/utils/user";
import Link from "next/link";

export default async function page({ params }) {
  const { id, topicId } = await params;
  const user = await getUser();
  const questions = await prisma.question.findMany({
    where: {
      topic_id: Number(topicId),
    },
  });

  const topic = await prisma.topic.findUniqueOrThrow({
    where: {
      topic_id: Number(topicId),
    },
    include: {
      course: true,
    },
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="font-bold text-5xl text-gray-800">Questions</h1>
        <h2 className="font-semibold text-3xl text-blue-600 mt-2">
          {topic.name}
        </h2>
      </div>

      {topic.course.teacher_id === user.user_id ? (
        <AddQuestion topicid={topicId} course_id={id} />
      ) : null}

      <div className="mt-10">
        {questions.length ? (
          <div className="grid grid-cols-12 gap-3 px-3 mb-3 font-semibold text-gray-600">
            <span className="col-span-8">Question</span>
            <span className="col-span-2">Created On</span>
            <span className="col-span-1">Difficulty</span>
          </div>
        ) : (
          <p className="text-gray-500">No questions available.</p>
        )}

        {questions.map((question) => (
          <div
            key={question.question_id}
            className={`grid grid-cols-12 px-3 py-2 rounded-xl items-center border-2 transition-all ${
              question.difficulty >= 8 ? "border-red-500 bg-red-100" : ""
            } ${
              question.difficulty < 8 && question.difficulty >= 4
                ? "border-blue-500 bg-blue-100"
                : ""
            } ${question.difficulty <= 3 ? "border-green-500 bg-green-100" : ""}
            `}
          >
            <span className="col-span-8 text-gray-700">{question.text}</span>
            <span className="col-span-2 text-gray-600">
              {question.createdOn.toDateString()}
            </span>
            <span className="col-span-1 text-center font-semibold">
              {question.difficulty}
            </span>
            {topic.course.teacher_id === user.user_id ? (
              <Link
                className="col-span-1 text-center text-blue-600 font-bold hover:underline"
                href={`/question/${question.question_id}`}
              >
                Edit
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
