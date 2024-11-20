import { Component } from "@/components/ui/barChart";
import { prisma } from "@/utils/db";
import { getUser } from "@/utils/user";
import Link from "next/link";

export default async function page() {
  const user = await getUser();
  const records = await prisma.examAnswerRecord.findMany({
    where: {
      student_id: user.user_id,
      Status: "completed",
    },
    orderBy: {
      updated: "desc",
    },
    take: 30,
    include: {
      exam: {
        include: {
          course: true,
        },
      },
    },
  });
  const latestRecords = records.slice(0, 6);
  const barChartRecords = records.map((record) => {
    return { name: record.exam.name, percentage: record.finalPercentage };
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 tracking-tight bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          Performance Reports
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestRecords.map((record) => (
            <Link
              href={`/exams/${record.record_id}/finalGrade`}
              key={record.record_id}
              className="group"
            >
              <div className="bg-white border border-gray-100 shadow-lg rounded-xl p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition">
                      {record.exam.course.name}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      {record.exam.name}
                    </p>
                  </div>
                  <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium">
                    Completed
                  </span>
                </div>
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-semibold text-green-600">
                      {record.finalPercentage}%
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(record.updated).toDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 tracking-tight">
            Performance Overview
          </h2>
          <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8">
            <Component records={barChartRecords} />
          </div>
        </div>
      </div>
    </div>
  );
}