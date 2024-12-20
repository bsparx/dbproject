import React from 'react';
import { Trophy, Star, Zap, Shield } from 'lucide-react';
import { prisma } from '@/utils/db';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Difficulty icons and colors remain the same
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

  // Grade details function remains the same
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

  // Custom components for ReactMarkdown
  const MarkdownComponents = {
    h1: ({node, ...props}) => (
      <h1 
        className="text-3xl font-bold mb-6 bg-gradient-to-r  from-blue-600 to-blue-400 bg-clip-text text-transparent" 
        {...props} 
      />
    ),
    h2: ({node, ...props}) => (
      <h2 
        className="text-2xl font-bold mb-4 text-blue-800 border-b border-blue-100 pb-2" 
        {...props} 
      />
    ),
    h3: ({node, ...props}) => (
      <h3 
        className="text-xl font-semibold mb-3 text-blue-700" 
        {...props} 
      />
    ),
    p: ({node, ...props}) => (
      <p 
        className="mb-4 text-gray-700 leading-relaxed text-base" 
        {...props} 
      />
    ),
    ul: ({node, ...props}) => (
      <ul 
        className=" mb-6" 
        {...props} 
      />
    ),
    ol: ({node, ...props}) => (
      <ol 
        className=" space-y-2 mb-6 counter-reset-item" 
        {...props} 
      />
    ),
    li: ({node, ...props}) => (
      <li 
        className="flex items-start space-x-2  text-gray-700"
        {...props}
      >
     
        <span>{props.children}</span>
      </li>
    ),
    code: ({node, inline, ...props}) => (
      inline ? 
        <code 
          className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded font-mono text-sm border border-blue-100" 
          {...props} 
        /> :
        <code 
          className="block bg-gray-50 p-4 rounded-lg text-sm font-mono my-4 border-l-4 border-blue-400 overflow-x-auto shadow-sm" 
          {...props} 
        />
    ),
    blockquote: ({node, ...props}) => (
      <blockquote 
        className="border-l-4 border-blue-400 pl-4 py-2 my-4 bg-blue-50 rounded-r-lg italic text-gray-700"
        {...props} 
      />
    ),
    a: ({node, ...props}) => (
      <a 
        className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors duration-200" 
        {...props} 
      />
    ),
    strong: ({node, ...props}) => (
      <strong 
        className="font-bold text-blue-900" 
        {...props} 
      />
    ),
    em: ({node, ...props}) => (
      <em 
        className="text-blue-800 italic" 
        {...props} 
      />
    ),
    hr: ({node, ...props}) => (
      <hr 
        className="my-8 border-t-2 border-blue-100" 
        {...props} 
      />
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-blue-100">
        {/* Header remains the same */}
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
                  
                  <p className="text-gray-700 text-base">
                    <span className="font-semibold text-blue-800">Question: </span>
                    {record.question.text}
                  </p>
                  
                  <div>
                    <p className="font-semibold text-blue-800 mb-2">Your Answer:</p>
                    <p className={`p-3 rounded-lg ${record.score === 10 ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'}`}>
                      {record.student_answer}
                    </p>
                  </div>
                  
                  {record.comments && (
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  
                  <div className="prose prose-blue max-w-none">
  <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-50">
    <ReactMarkdown 
      components={MarkdownComponents}
      className="space-y-4 text-gray-700"
      remarkPlugins={[remarkGfm]}
    >
      {record.comments}
    </ReactMarkdown>
  </div>
</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Grade Section remains the same */}
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