import React from 'react';
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Clock, Book, ArrowLeft } from "lucide-react";
import { prisma } from "@/utils/db";
import { getUser } from "@/utils/user";
import { getTotalQuestions } from '@/utils/getters';

export default async function Page({ params }) {
  const { recordId } = await params;
  const user = await getUser();

  const examAnswerRecord = await prisma.examAnswerRecord.findUnique({
    where: {
      student_id: user.user_id,
      record_id: Number(recordId),
    },
    include: {
      exam: true,
    },
  });



  const exam = examAnswerRecord?.exam;
  const NoOfQuestions=await getTotalQuestions(exam?.exam_id)
  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-96 text-center">
          <CardContent className="pt-6">
            <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Exam not found
            </div>
            <Link href="/exams" className="mt-4 inline-block">
              <Button className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Exams
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4 animate-fadeIn">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="space-y-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="space-y-2">
                  <CardTitle className="text-3xl font-bold">{exam.name}</CardTitle>
                  <div className="flex items-center space-x-4 text-blue-100">

                    <div className="flex items-center">
                      <Book className="h-4 w-4 mr-2" />
                      <span className="text-sm">{NoOfQuestions} questions</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Link href="/exams">
                    <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                  </Link>
                  <Link href={`/exams/${recordId}`}>
                    <Button className="bg-white text-blue-600 hover:bg-blue-50">
                      Start Exam
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-3xl font-bold mb-6 mt-8 text-gray-800 dark:text-gray-100" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-2xl font-semibold mb-4 mt-6 text-gray-700 dark:text-gray-200" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600 dark:text-gray-300" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-600 dark:text-gray-300" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="mb-2 text-gray-600 dark:text-gray-300" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-blue-600 dark:text-blue-400" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-700 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/20 py-2 rounded-r" {...props} />
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 font-mono text-sm" {...props} />
                    ),
                  }}
                >
                  {exam.revisionString}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}