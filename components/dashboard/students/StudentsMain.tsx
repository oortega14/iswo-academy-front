"use client"
import { HeaderDashboard } from "../content/HeaderDashboard"
import { StudentsMainContent } from "./StudentsMainContent"

export const StudentsMain = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <StudentsMainContent/>
      </div>
    </>
  )
}
export default StudentsMain
