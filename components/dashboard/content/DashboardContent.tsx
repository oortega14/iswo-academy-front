"use client"

import { HeaderDashboard } from "./HeaderDashboard"
import AdminMainContent from "../admin/AdminMainContent"

export const DashboardContent = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <AdminMainContent/>
      </div>
    </>
  )
}
export default DashboardContent
