"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import EditCourseContent from "./EditCourseContent"

export const EditCourse = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <EditCourseContent/>
      </div>
    </>
  )
}
export default EditCourse
