"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import EditLessonContent from "./EditLessonContent"

export const EditLesson = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <EditLessonContent/>
      </div>
    </>
  )
}
export default EditLesson
