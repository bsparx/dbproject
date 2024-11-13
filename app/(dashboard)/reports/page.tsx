import { Component } from "@/components/ui/barChart";
import { prisma } from "@/utils/db";
import { getUser } from "@/utils/user";

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
    take: 6,
    include: {
      exam: {
        include: {
          course: true,
        },
      },
    },
  });
  return (
    <h1>
      Reports
      {records.map((record) => {
        return (
          <div key={record.record_id}>
            {record.exam.course.name} {record.exam.name}{" "}
            {record.finalPercentage} {record.updated.toDateString()}
          </div>
        );
      })}
      <div className="h-1/2 w-1/2">
        <Component />
      </div>
    </h1>
  );
}
