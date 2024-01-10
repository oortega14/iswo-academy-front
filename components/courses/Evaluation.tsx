"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import EvaluationContent from "./EvaluationContent"

export const Evaluation = () => {
  return (
    <>
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <HeaderDashboard/>
        <EvaluationContent/>
      </div>
    </>
  )
}
export default Evaluation
