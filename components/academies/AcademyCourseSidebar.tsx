'use client'
import SidebarHeader from "../dashboard/sidebar/SidebarHeader"
import { cn } from "@/lib/utils"
import { useUIStore } from "@/store/ui/ui-store"
import { Course } from "@/types/sidebar"

const AcademyCourseSidebar = ({ course }: { course: Course } ) => {
  return (
    <aside
      className={cn(
        "dark:bg-blue-dark z-10 flex min-h-screen max-h-screen w-64 shrink-0 flex-col overflow-hidden border-l bg-white  shadow-lg transition-all lg:static lg:z-auto lg:shadow-none overflow-y-hidden"
      )}
    >
    </aside>
  )
}

export default AcademyCourseSidebar
