"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import AnswersContent from "./AnswersContent"

export const Answers = () => {
  return (
    <>
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <HeaderDashboard/>
        <AnswersContent/>
      </div>
    </>
  )
}
export default Answers
