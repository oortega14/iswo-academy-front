"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import EvaluationContent from "./EvaluationContent"

export const Evaluation = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <EvaluationContent/>
      </div>
    </>
  )
}
export default Evaluation
