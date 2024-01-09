'use client'
import { useUIStore } from "@/store/ui/ui-store"
import { cn } from "../../../lib/utils"
import SidebarFooter from "./SidebarFooter"
import SidebarHeader from "./SidebarHeader"
import { SidebarLinks } from "./SidebarLinks"

export interface SidebarProps {
  id: string
}

export const Sidebar = ({ id }: SidebarProps) => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const changeSidebar = useUIStore((state) => state.changeSidebar)

  return (
    <>
      <aside
        className={cn(
          "fixed bg-white inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 min-h-screen overflow-hidden transition-all transform  border-r shadow-lg lg:z-auto lg:static lg:shadow-none dark:bg-blue-dark",
          { "-translate-x-full lg:translate-x-0 lg:w-20": !isSidebarOpen }
        )}
      >
        <SidebarHeader />
        <SidebarLinks id={id} />
        <SidebarFooter />
      </aside>
    </>
  )
}

export default Sidebar
