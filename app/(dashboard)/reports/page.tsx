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
  console.log(barChartRecords);

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Reports</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestRecords.map((record) => {
          return (
            <Link
              href={`/exams/${record.record_id}/finalGrade`}
              key={record.record_id}
            >
              <div className="bg-white shadow-md rounded-lg p-4 transition hover:shadow-lg hover:scale-105">
                <h2 className="text-lg font-semibold text-gray-700">
                  {record.exam.course.name}
                </h2>
                <p className="text-gray-600">
                  {record.exam.name}
                </p>
                <p className="text-blue-500 font-medium">
                  Final Score: {record.finalPercentage}%
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(record.updated).toDateString()}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Performance Overview
        </h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <Component records={barChartRecords} />
        </div>
      </div>
    </div>
  );
}
