"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import AdminCourseContent from '@/components/courses/AdminCourseContent';


const AdminCourse = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <AdminCourseContent/>
      </div>
    </>
  )
}
export default AdminCourse
