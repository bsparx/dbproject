import React from 'react';
import { Trophy, Star, Zap, Shield } from 'lucide-react';
import { prisma } from '@/utils/db';

// Difficulty icons and colors
const difficultyMap = {
  easy: { 
    icon: <Star className="w-5 h-5 text-green-500" />, 
    color: 'text-green-600 bg-green-50 border-green-200',
    description: 'Simple and straightforward'
  },
  medium: { 
    icon: <Zap className="w-5 h-5 text-yellow-500" />, 
    color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    description: 'Requires some thought'
  },
  hard: { 
    icon: <Shield className="w-5 h-5 text-red-500" />, 
    color: 'text-red-600 bg-red-50 border-red-200',
    description: 'Challenging and complex'
  }
};

export default async function GradeOverviewPage({ params }) {
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

  // Enhanced grade color determination
  const getGradeDetails = (percentage) => {
    if (percentage >= 90) return {
      color: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
      textColor: 'text-white',
      trophy: <Trophy className="w-16 h-16 text-yellow-300" />,
      label: 'Excellent',
      message: 'Outstanding performance!'
    };
    if (percentage >= 80) return {
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      textColor: 'text-white',
      trophy: <Trophy className="w-16 h-16 text-silver-300" />,
      label: 'Great',
      message: 'Very good work!'
    };
    if (percentage >= 70) return {
      color: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
      textColor: 'text-white',
      trophy: <Trophy className="w-16 h-16 text-bronze-300" />,
      label: 'Good',
      message: 'Solid performance'
    };
    if (percentage >= 60) return {
      color: 'bg-gradient-to-br from-orange-400 to-orange-600',
      textColor: 'text-white',
      label: 'Satisfactory',
      message: 'Room for improvement'
    };
    return {
      color: 'bg-gradient-to-br from-red-400 to-red-600',
      textColor: 'text-white',
      label: 'Needs Work',
      message: 'Keep practicing!'
    };
  };

  const gradeDetails = getGradeDetails(finalPercentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-blue-100 ">
        {/* Header */}
        <div className={`${gradeDetails.color} ${gradeDetails.textColor} py-8 px-10 text-center relative overflow-hidden`}>
          <div className="absolute -top-10 -right-10 opacity-20">
            {gradeDetails.trophy}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Assessment Results
          </h1>
          <p className="text-xl opacity-80">
            {gradeDetails.message}
          </p>
        </div>

        {/* Question Details */}
        <div className="p-8 space-y-6">
          {data.map((record, index) => {
            // Determine difficulty based on some criteria (you might want to adjust this)
            const difficulty = record.score <= 4 ? 'hard' : 
                               record.score <= 7 ? 'medium' : 'easy';
            const difficultyInfo = difficultyMap[difficulty];

            return (
              <div 
                key={index}
                className="bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <h2 className="text-xl font-bold text-blue-900">
                        Question {index + 1}
                      </h2>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${difficultyInfo.color}`}>
                        {difficultyInfo.icon}
                        <span className="text-sm font-medium">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${record.score === 10 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      Score: {record.score}/10
                    </span>
                  </div>
                  
                  {/* Question Text */}
                  <p className="text-gray-700 text-base">
                    <span className="font-semibold text-blue-800">Question: </span>
                    {record.question.text}
                  </p>
                  
                  {/* Student's Answer */}
                  <div>
                    <p className="font-semibold text-blue-800 mb-2">Your Answer:</p>
                    <p className={`p-3 rounded-lg ${record.score === 10 ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'}`}>
                      {record.student_answer}
                    </p>
                  </div>
                  
                  {/* Teacher's Comments */}
                  {record.comments && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <p className="font-semibold text-blue-800 mb-2">Instructor's Feedback:</p>
                      <p className="text-gray-700 italic">{record.comments}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Grade Section */}
        <div className={`p-10 text-center ${gradeDetails.color} ${gradeDetails.textColor} border-t border-blue-100`}>
          <h2 className="text-2xl font-bold mb-6">Final Grade</h2>
          <div className="flex items-center justify-center space-x-8">
            <div className="bg-white/20 rounded-full w-48 h-48 flex items-center justify-center shadow-xl">
              <div className="bg-white rounded-full w-40 h-40 flex items-center justify-center">
                <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  {finalPercentage.toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold mb-2">{gradeDetails.label}</h3>
              <p className="text-xl opacity-80">{gradeDetails.message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}