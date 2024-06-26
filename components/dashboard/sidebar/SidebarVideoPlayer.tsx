"use client"

import { useUIStore } from "@/store/ui/ui-store"
import { useMotionValueEvent, useScroll } from "framer-motion"
import { MotionDiv } from "@/components/animations/MotionDiv"
import { cn } from "../../../lib/utils"
import { useState } from "react"
import { SidebarVideoPlayerLinks } from "./SidebarVideoPlayerLinks"
import SidebarFooterVideoPlayer from "./SidebarFooterVideoPlayer"
import SidebarHeaderVideoPlayer from "./SidebarHeaderVideoPlayer"



export const SidebarVideoPlayer = () => {
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
            "dark:bg-blue-dark inset-y-0 z-10 flex max-h-screen min-h-screen w-64 shrink-0 flex-col overflow-hidden border-r bg-white  shadow-lg transition-all lg:static lg:z-auto lg:shadow-none",
            { "-translate-x-full lg:translate-x-0 lg:w-20": !isSidebarOpen }
          )}
        >
          <SidebarHeaderVideoPlayer />
          <SidebarVideoPlayerLinks />
          <SidebarFooterVideoPlayer />
        </aside>
      </MotionDiv>
    </>
  )
}

export default SidebarVideoPlayer
