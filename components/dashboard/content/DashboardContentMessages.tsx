"use client"
import MainContent from "./MainContent"
import { HeaderDashboard } from "./HeaderDashboard"
import MessagesContent from "./MessagesContent"

export const DashboardContentMessages = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <MessagesContent/>
      </div>
    </>
  )
}
export default DashboardContentMessages
