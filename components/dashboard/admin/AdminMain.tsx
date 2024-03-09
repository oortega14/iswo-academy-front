"use client"
import { HeaderDashboard } from "../content/HeaderDashboard"
import { AdminMainContent } from "./AdminMainContent"

export const AdminMain = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <AdminMainContent/>
      </div>
    </>
  )
}
export default AdminMain
