"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import SectionsContent from "./SectionsContent"

export const Sections = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <SectionsContent/>
      </div>
    </>
  )
}
export default Sections
