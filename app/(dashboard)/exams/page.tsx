import { getUserExams } from "@/utils/getters";
import { getUser } from "@/utils/user";
import AttemptQuiz from "@/components/AttemptQuiz";

export default async function ExamPage() {
  const user = await getUser();
  const exams = await getUserExams(user.user_id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Available Exams
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Ready to showcase your knowledge? Select an exam to begin your assessment.
          </p>
        </header>

        {exams.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <svg 
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4M7 20l4-4 4 4M3 4h18M4 4h16v12H4V4z" 
              />
            </svg>
            <p className="text-xl text-gray-700">
              No exams are currently available.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {exams.map((exam) => (
              <div 
                key={exam.exam_id} 
                className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {exam.name}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    Exam ID: {exam.exam_id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Ready to test your skills? Click below to start the exam.
                  </p>
                </div>
                <AttemptQuiz 
                  exam_id={exam.exam_id} 
                  student_id={user.user_id} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}