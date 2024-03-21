"use client"

import AcademiesStatisticsContent from "./AcademiesStatisticsContent"
import { DashboardHeader } from "./DashboardHeader"

const AcademiesStatistics = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <DashboardHeader/>
        <AcademiesStatisticsContent/>
      </div>
    </>
  )
}

export default AcademiesStatistics
