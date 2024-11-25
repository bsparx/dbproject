import React from 'react';
import GenerateQuestions from "@/components/GenerateQuestions";
import { getBufferQuestionsForTopic, getTopic } from "@/utils/getters";
import Link from "next/link";
import { redirect } from "next/navigation";
import GeneratedQuestion from '@/components/GeneratedQuestion';

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
      <GeneratedQuestion question={question} id={id}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}