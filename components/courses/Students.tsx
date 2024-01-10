"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import StudentsContent from "./StudentsContent";


const AdminCourse = () => {
  return (
    <>
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <HeaderDashboard/>
        <StudentsContent/>
      </div>
    </>
  )
}
export default AdminCourse
