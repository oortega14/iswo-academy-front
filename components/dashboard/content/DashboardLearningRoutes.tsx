"use client"
import { HeaderDashboard } from "./HeaderDashboard"
import LearningRoutesContent from './LearningRoutesContent'

const DashBoardLearningRoutes = () => {
  return(
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <LearningRoutesContent/>
      </div>
    </>
  )
}

export default DashBoardLearningRoutes
