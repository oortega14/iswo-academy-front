"use client"
import MainContent from "./MainContent"
import { HeaderDashboard } from "./HeaderDashboard"

export const DashboardContent = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <MainContent/>
      </div>
    </>
  )
}
export default DashboardContent
