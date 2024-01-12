import { cn } from "@/lib/utils"
import { useUIStore } from "@/store/ui/ui-store"
import React from "react"

const HideSidebarButton = () => {
  const changeSidebar = useUIStore((state) => state.changeSidebar)
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)

  return (
    <button
      onClick={changeSidebar}
      className="rounded-md p-2 focus:outline-none focus:ring"
    >
      <svg
        className={cn("h-4 w-4 text-gray-600", {
          "transition-transform -rotate-180": isSidebarOpen,
        })}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 5l7 7-7 7M5 5l7 7-7 7"
        />
      </svg>
    </button>
  )
}
export default HideSidebarButton
