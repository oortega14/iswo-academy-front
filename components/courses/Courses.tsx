"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import CoursesContent from "./CoursesContent"

export const Courses = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <CoursesContent/>
      </div>
    </>
  )
}
export default Courses
