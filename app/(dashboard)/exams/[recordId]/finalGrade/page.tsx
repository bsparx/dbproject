import { prisma } from "@/utils/db";

export default async function page({ params }) {
  const { recordId } = await params;
  const data = await prisma.checkedAnswers.findMany({
    where: {
      record_id: Number(recordId),
    },
    include: {
      question: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Final Grade Overview
        </h1>
        
        <div className="space-y-6">
          {data.map((record, index) => (
            <div
              key={index}
              className="p-6 bg-blue-50 rounded-lg shadow-md space-y-3"
            >
              <h2 className="text-xl font-bold text-blue-800">
                Question: <span className="font-normal text-gray-700">{record.question.text}</span>
              </h2>
              <p className="text-lg text-gray-800">
                <span className="font-semibold">Correct answer:</span> {record.question.correct_answer}
              </p>
              <p className="text-lg text-gray-800">
                <span className="font-semibold">Student's Answer:</span> {record.student_answer}
              </p>
              <p className="text-lg text-gray-800">
                <span className="font-semibold">Score:</span> {record.score}/10
              </p>
              <p className="text-lg text-gray-800">
                <span className="font-semibold">Teacher's Comment:</span> {record.comments}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
