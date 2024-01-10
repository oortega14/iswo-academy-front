"use client"
import MainContent from "./MainContent"
import { HeaderDashboard } from "./HeaderDashboard"
import MessagesContent from "./MessagesContent"

export const DashboardContentMessages = () => {
  return (
    <>
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <HeaderDashboard/>
        <MessagesContent/>
      </div>
    </>
  )
}
export default DashboardContentMessages
