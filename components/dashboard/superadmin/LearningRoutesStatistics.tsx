"use client"

import CourseStatisticsContent from "./CourseStatisticsContent"
import { DashboardHeader } from "./DashboardHeader"
import LearningRoutesStatisticsContent from "./LearningRoutesStatisticsContent"

const LearningRoutesStatistics = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <DashboardHeader/>
        <LearningRoutesStatisticsContent/>
      </div>
    </>
  )
}

export default LearningRoutesStatistics
