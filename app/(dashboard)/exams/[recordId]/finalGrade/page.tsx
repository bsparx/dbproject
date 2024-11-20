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

  const finalTotal = data.reduce((sum, value) => sum + value.score, 0);
  const finalPercentage = (finalTotal / (data.length * 10)) * 100;

  // Determine grade color and description based on percentage
  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 80) return 'text-blue-600 bg-blue-50';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
    if (percentage >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const gradeColorClass = getGradeColor(finalPercentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-blue-100">
        <div className="bg-blue-600 text-white py-6 px-8">
          <h1 className="text-4xl font-extrabold text-center tracking-tight">
            Final Grade Overview
          </h1>
        </div>

        <div className="p-8 space-y-8">
          {data.map((record, index) => (
            <div
              key={index}
              className="bg-white border border-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-blue-900 flex-grow pr-4">
                    Question {index + 1}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${record.score === 10 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    Score: {record.score}/10
                  </span>
                </div>
                
                <p className="text-gray-700 text-base">
                  <span className="font-semibold text-blue-800">Question: </span>
                  {record.question.text}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-blue-800">Correct Answer:</p>
                    <p className="text-green-700 bg-green-50 p-2 rounded">
                      {record.question.correct_answer}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-800">Student's Answer:</p>
                    <p className={`p-2 rounded ${record.score === 10 ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'}`}>
                      {record.student_answer}
                    </p>
                  </div>
                </div>
                
                {record.comments && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-semibold text-blue-800">Teacher's Comment:</p>
                    <p className="text-gray-700 italic">{record.comments}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={`p-8 text-center ${gradeColorClass} border-t border-blue-100`}>
          <h2 className="text-2xl font-bold mb-4">Final Grade</h2>
          <div className="bg-white rounded-full w-40 h-40 flex items-center justify-center mx-auto shadow-lg">
            <p className="text-4xl font-extrabold">
              {finalPercentage.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}