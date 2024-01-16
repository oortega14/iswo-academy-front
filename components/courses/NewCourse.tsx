"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import NewCoursesContent from "./NewCourseContent"

export const NewCourse = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <NewCoursesContent/>
      </div>
    </>
  )
}
export default NewCourse
