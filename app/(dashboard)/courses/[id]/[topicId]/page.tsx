// page.js
import AddQuestion from "@/components/AddQuestion";
import { prisma } from "@/utils/db";
import { getUser } from "@/utils/user";
import Link from "next/link";
import { BookOpen, FileQuestion, Calendar, TrendingUp } from "lucide-react";
import { notFound } from "next/navigation";

export default async function page({ params }) {
  const { id, topicId } = await params;
  const user = await getUser();
  const questions = await prisma.question.findMany({
    where: { topic_id: Number(topicId) },
  });

  const topic = await prisma.topic.findUnique({
    where: { topic_id: Number(topicId) },
    include: { course: true },
  });
  if(!topic){
    notFound()
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
          <div className="flex items-center justify-center gap-3 text-white mb-2">
            <BookOpen className="w-8 h-8" />
            <h1 className="font-bold text-4xl">Questions</h1>
          </div>
          <h2 className="font-semibold text-2xl text-blue-100 flex items-center justify-center gap-2">
            <FileQuestion className="w-6 h-6" />
            {topic.name}
          </h2>
        </div>

        {topic.course.teacher_id === user.user_id && (
          <div className="p-6">
            <AddQuestion topicid={topicId} course_id={id} />
          </div>
        )}

        <div className="p-6">
          {questions.length ? (
            <div>
              <div className="grid grid-cols-12 gap-3 px-3 mb-3 font-semibold text-gray-500 border-b pb-2">
                <span className="col-span-7 flex items-center gap-2">
                  <FileQuestion className="w-5 h-5 text-blue-500" /> Question
                </span>
                <span className="col-span-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-500" /> Created On
                </span>
                <span className="col-span-2 flex items-center gap-2 justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-500" /> Difficulty
                </span>
                {topic.course.teacher_id === user.user_id && (
                  <span className="col-span-1 text-center">Actions</span>
                )}
              </div>

              <div className="space-y-3">
                {questions.map((question) => (
                  <div
                    key={question.question_id}
                    className={`grid grid-cols-12 px-3 py-4 rounded-xl items-center shadow-sm hover:shadow-md transition-all duration-300 ${
                      question.difficulty >= 8
                        ? "bg-red-50 border-red-200 hover:bg-red-100"
                        : question.difficulty < 8 && question.difficulty >= 4
                        ? "bg-blue-50 border-blue-200 hover:bg-blue-100"
                        : "bg-green-50 border-green-200 hover:bg-green-100"
                    }`}
                  >
                    <span className="col-span-7 text-gray-700 font-medium">
                      {question.text}
                    </span>
                    <span className="col-span-2 text-gray-600">
                      {question.createdOn.toDateString()}
                    </span>
                    <span
                      className={`col-span-2 text-center font-bold rounded-full py-1 ${
                        question.difficulty >= 8
                          ? "bg-red-100 text-red-700"
                          : question.difficulty < 8 && question.difficulty >= 4
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {question.difficulty}
                    </span>
                    {topic.course.teacher_id === user.user_id && (
                      <Link
                        className="col-span-1 text-center text-blue-600 font-bold hover:underline transition hover:text-blue-800"
                        href={`/question/${question.question_id}`}
                      >
                        Edit
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-10 bg-gray-100 rounded-xl">
              No questions available. Create your first question!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}