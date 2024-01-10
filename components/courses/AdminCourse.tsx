"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import AdminCourseContent from '@/components/courses/AdminCourseContent';


const AdminCourse = () => {
  return (
    <>
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <HeaderDashboard/>
        <AdminCourseContent/>
      </div>
    </>
  )
}
export default AdminCourse
