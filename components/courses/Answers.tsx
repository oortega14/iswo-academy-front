"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import AnswersContent from "./AnswersContent"

export const Answers = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <AnswersContent/>
      </div>
    </>
  )
}
export default Answers
