"use client"

import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import StudentsContent from "./StudentsContent";


const AdminCourse = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <StudentsContent/>
      </div>
    </>
  )
}
export default AdminCourse
