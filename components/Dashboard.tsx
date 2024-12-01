import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutGrid,
  BookOpen,
  ClipboardList,
  Trophy,
  TrendingUp,
  BookmarkIcon,
  FileText,
  BarChart,
} from "lucide-react";
import AttemptPaper from "./AttemptPaper";
import AttemptQuiz from "./AttemptQuiz";
import Link from "next/link";

// Types based on the Prisma schema
type User = {
  user_id: number;
  name: string;
  MockExam?: any[];
};

type Course = {
  course_id: number;
  name: string;
};

type MockExam = {
  exam_id: number;
  name: string;
  average_difficulty: number;
};

type Dashboard = {
  user: User;
  courses: Course[];
  recentExams: MockExam[];
  reports: any[];
};

// Recent Courses Component
export const RecentCoursesCard = ({ courses }: { courses: Course[] }) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Your Courses</CardTitle>
      <BookmarkIcon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {courses && courses.length ? (
          courses.map((course) => (
            <Link
              href={`courses/${course.course_id}`}
              key={course.course_id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-sm font-medium">{course.name}</span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </Link>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center">No courses found</p>
        )}
      </div>
    </CardContent>
  </Card>
);

// Recent Exams Component
export const RecentExamsCard = ({
  recentExams,
  user_id,
}: {
  recentExams: MockExam[];
  user_id: number;
}) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Recent Exams</CardTitle>
      <ClipboardList className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {recentExams && recentExams.length ? (
          recentExams.map((exam) => (
            <div
              key={exam.exam_id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">{exam.name}</span>
                <span className="text-xs text-gray-500">
                  Difficulty: {exam.average_difficulty.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <AttemptQuiz exam_id={exam.exam_id} student_id={user_id} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center">No recent exams</p>
        )}
      </div>
    </CardContent>
  </Card>
);

export const RecentReportsCard = ({
  reports,
}: {
  reports: ExamAnswerRecord[];
}) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Recent Reports</CardTitle>
      <FileText className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {reports.length ? (
          reports.map((report) => (
            <Link
              href={`/exams/${report.record_id}/finalGrade`}
              key={report.record_id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">{report.exam.name}</span>
                <span className="text-xs text-gray-500">
                  Last Updated: {new Date(report.updated).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-xs font-semibold ${
                    report.Status === "completed"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {report.Status.charAt(0).toUpperCase() +
                    report.Status.slice(1)}
                </span>
                <span className="text-sm font-bold text-blue-500">
                  {report.finalPercentage.toFixed(1)}%
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center">No recent reports</p>
        )}
      </div>
    </CardContent>
  </Card>
);
