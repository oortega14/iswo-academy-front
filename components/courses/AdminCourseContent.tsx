"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import CourseContent from "./CourseContent"


export const AdminCourseContent = () => {
  return (
    <>
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <HeaderDashboard/>
        <CourseContent/>
      </div>
    </>
  )
}
export default AdminCourseContent
