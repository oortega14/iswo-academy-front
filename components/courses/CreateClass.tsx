"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import CreateClassContent from "./CreateClassContent"

export const CreateClass = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <CreateClassContent/>
      </div>
    </>
  )
}
export default CreateClass
