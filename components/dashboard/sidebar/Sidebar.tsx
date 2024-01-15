"use client"

import { useUIStore } from "@/store/ui/ui-store"
import { useMotionValueEvent, useScroll } from "framer-motion"

import { MotionDiv } from "@/components/animations/MotionDiv"

import { cn } from "../../../lib/utils"
import SidebarFooter from "./SidebarFooter"
import SidebarHeader from "./SidebarHeader"
import { SidebarLinks } from "./SidebarLinks"
import { useState } from "react"



export const Sidebar = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const [scrollValue, setScrollValue] = useState(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollValue(latest)
  })
  return (
    <>
      <MotionDiv
        animate={{ y: scrollValue }}
        transition={{
          type: 'just'
        }}
      >
        <aside
          className={cn(
            "dark:bg-blue-dark inset-y-0 z-10 flex min-h-screen max-h-screen w-64 shrink-0 flex-col overflow-hidden border-r bg-white  shadow-lg transition-all lg:static lg:z-auto lg:shadow-none overflow-y-hidden",
            { "-translate-x-full lg:translate-x-0 lg:w-20": !isSidebarOpen }
          )}
        >
          <SidebarHeader />
          <SidebarLinks />
          <SidebarFooter />
        </aside>
      </MotionDiv>
    </>
  )
}

export default Sidebar
