import {  RecentCoursesCard, RecentExamsCard, RecentReportsCard } from "@/components/Dashboard";


export default async function Dashboard() {
    const { get5Reports, get5UserExams, getTeacherCourses,getAllUserCourses } = await import(
      "@/utils/getters"
    );
    const { getUser } = await import("@/utils/user");
  
    const user = await getUser();
    let courses = [];
    if (user.role === "student") {
      courses = await getAllUserCourses(user.user_id);
      console.log(courses)
    } else {
      courses = await getTeacherCourses(user.user_id);
    }
  
    const recentExams = await get5UserExams(user.user_id);
    const reports = await get5Reports(user.user_id);
  
    return (
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">
          Welcome, <span className="text-blue-500">{user.name}</span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
 
          <RecentCoursesCard courses={courses} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentExamsCard recentExams={recentExams} user_id={user.user_id} />
          <RecentReportsCard reports={reports} />
        </div>
      </div>
    );
  }