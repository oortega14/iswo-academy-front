"use client"

import { DashboardHeader } from "./DashboardHeader"
import SuperAdminDashboardContent from "./SuperAdminDashboardContent"

export const SuperAdminDashboard = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <DashboardHeader/>
        <SuperAdminDashboardContent/>
      </div>
    </>
  )
}
export default SuperAdminDashboard
