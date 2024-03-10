"use client"

import CourseStatisticsContent from "./CourseStatisticsContent"
import { DashboardHeader } from "./DashboardHeader"

const CourseStatistics = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <DashboardHeader/>
        <CourseStatisticsContent/>
      </div>
    </>
  )
}

export default CourseStatistics
