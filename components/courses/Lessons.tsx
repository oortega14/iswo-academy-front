"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import LessonsContent from "./LessonsContent"

export const Lessons = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <LessonsContent/>
      </div>
    </>
  )
}
export default Lessons
