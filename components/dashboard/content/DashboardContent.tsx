"use client"
import MainContent from "./MainContent"
import { HeaderDashboard } from "./HeaderDashboard"

export const DashboardContent = () => {
  return (
    <>
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <HeaderDashboard/>
        <MainContent/>
      </div>
    </>
  )
}
export default DashboardContent