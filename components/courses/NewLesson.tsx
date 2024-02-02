"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import NewLessonContent from "./NewLessonContent"

export const NewLesson = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <NewLessonContent/>
      </div>
    </>
  )
}
export default NewLesson
