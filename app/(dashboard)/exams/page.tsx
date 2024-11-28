import { getUserExams } from "@/utils/getters";
import { getUser } from "@/utils/user";
import AttemptQuiz from "@/components/AttemptQuiz";

const getDifficultyDetails = (difficulty: number) => {
  if (difficulty <= 3) {
    return {
      label: "Easy",
      color: "bg-green-100 text-green-800 border-green-200",
      barColor: "bg-green-500",
      percentage: "w-1/3"
    };
  } else if (difficulty <= 9) {
    return {
      label: "Medium",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      barColor: "bg-yellow-500",
      percentage: "w-2/3"
    };
  } else {
    return {
      label: "Hard",
      color: "bg-red-100 text-red-800 border-red-200",
      barColor: "bg-red-500",
      percentage: "w-full"
    };
  }
};

export default async function ExamPage() {
  const user = await getUser();
  const exams = await getUserExams(user.user_id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-blue-600" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Your Available Exams
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Ready to showcase your knowledge? Select an exam to begin your assessment.
          </p>
        </header>

        {exams.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center border-l-4 border-blue-500">
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
            <p className="text-sm text-gray-500 mt-2">
              Check back later or contact your instructor.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {exams.map((exam) => {
              const difficultyDetails = getDifficultyDetails(exam.average_difficulty);
              return (
                <div 
                  key={exam.exam_id} 
                  className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between hover:shadow-xl transition-all duration-300 group border-l-4 hover:border-blue-500 border-transparent"
                >
                  <div className="flex-grow pr-4">
                    <div className="flex items-center mb-2">
                      <h2 className="text-xl font-semibold text-gray-800 mr-3">
                        {exam.name}
                      </h2>
                      <span 
                        className={`
                          inline-flex items-center 
                          px-2.5 py-0.5 rounded-full 
                          text-xs font-medium 
                          ${difficultyDetails.color}
                          border
                        `}
                      >
                        {difficultyDetails.label}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <p className="text-gray-600 mr-3">
                        Exam ID: <span className="font-mono text-sm">{exam.exam_id}</span>
                      </p>
                      <div className="w-32 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`
                            ${difficultyDetails.barColor} 
                            ${difficultyDetails.percentage} 
                            h-2.5 rounded-full
                          `}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Difficulty Level: {exam.average_difficulty}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Ready to test your skills? Click below to start the exam.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <AttemptQuiz 
                      exam_id={exam.exam_id} 
                      student_id={user.user_id} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}