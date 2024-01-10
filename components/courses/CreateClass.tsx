"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import CreateClassContent from "./CreateClassContent"

export const CreateClass = () => {
  return (
    <>
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <HeaderDashboard/>
        <CreateClassContent/>
      </div>
    </>
  )
}
export default CreateClass
