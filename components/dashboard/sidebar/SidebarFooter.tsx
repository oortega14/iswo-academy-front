import { cn } from "@/lib/utils"
import { useUIStore } from "@/store/ui/ui-store"
import React from "react"

export const SidebarFooter = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const changeSidebar = useUIStore((state) => state.changeSidebar)
  return (
    <>
      {/* Sidebar Footer */}
      <div className="flex-shrink-0 p-2 border-t max-h-14">
        <button className="flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium tracking-wider uppercase border rounded-md focus:outline-none focus:ring">
          <span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </span>
          <span className={cn({ "lg:hidden": !isSidebarOpen })}>Logout</span>
        </button>
      </div>
    </>
  )
}
export default SidebarFooter
