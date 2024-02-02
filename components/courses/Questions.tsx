"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import LessonsContent from "./LessonsContent"
import QuestionsContent from "./QuestionsContent"

export const Questions = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <QuestionsContent/>
      </div>
    </>
  )
}
export default Questions
