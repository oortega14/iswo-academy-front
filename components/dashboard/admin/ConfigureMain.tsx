"use client"
import { HeaderDashboard } from "../content/HeaderDashboard"
import { ConfigureMainContent } from "./ConfigureMainContent"

export const ConfigureMain = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <ConfigureMainContent/>
      </div>
    </>
  )
}
export default ConfigureMain
