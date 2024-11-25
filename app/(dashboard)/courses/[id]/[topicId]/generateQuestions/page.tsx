import React from 'react';
import AddBufferQuestionToBank from "@/components/AddBufferQuestionToBank";
import DeleteBufferQuestion from "@/components/DeleteBufferQuestion";
import GenerateQuestions from "@/components/GenerateQuestions";
import { getBufferQuestionsForTopic, getTopic } from "@/utils/getters";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const { id, topicId } = await params;
  const topic = await getTopic(topicId);
  
  if (!topic?.contentString) {
    redirect(`/courses/${id}/${topicId}/editContent`);
  }
  
  const bufferQuestions = await getBufferQuestionsForTopic(topicId);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Question Generator</h1>
        <Link 
          href={`/courses/${id}/${topicId}/editContent`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105 shadow-md"
        >
          Edit Content
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
        <GenerateQuestions topicId={topicId} id={id} />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-800 p-2 rounded-lg shadow-sm">📝</span>
          Generated Questions
        </h2>
        
        {bufferQuestions.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-600 font-medium">No questions have been generated yet. Use the form above to create some!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bufferQuestions.map((question, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                      (question.difficulty < 4) ? 'bg-green-100 text-green-800' :
                      ((question.difficulty > 4) && (question.difficulty < 7)) ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      Difficulty: {question.difficulty}
                    </span>
                    <time className="text-sm text-gray-500 font-medium">
                      {question.createdOn.toDateString()}
                    </time>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-500">Question</p>
                      <p className="text-gray-800 text-lg">{question.text}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm font-semibold text-gray-500 mb-2">Answer</p>
                      <p className="text-gray-800 bg-gray-50 p-4 rounded-lg">
                        {question.correct_answer}
                      </p>
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <AddBufferQuestionToBank bufferQuestion={question} id={id}/>
                      <Link 
                        href={`/bufferquestion/${question.question_id}`}
                        className="px-4 py-2 bg-orange-100 text-gray-700 rounded-lg hover:bg-orange-200 transition-colors duration-200 font-medium flex items-center gap-2"
                      >
                        ✏️ Edit Question
                      </Link>
                      <DeleteBufferQuestion bufferQuestion={question} id={id}/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}