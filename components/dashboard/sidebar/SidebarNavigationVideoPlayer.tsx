"use client"

import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"

import { SidebarNavigationVideoPlayerProps } from "@/types/sidebar"
import { Accordion } from "@/components/ui/accordion"

import { SidebarSection } from "./SidebarSection"

export const SidebarNavigationVideoPlayer = ({
  sections,
  handleClick
}: SidebarNavigationVideoPlayerProps) => {
  const openSidebar = useUIStore((state) => state.changeSidebar)
  const params = useParams()
  return (
    <>
      <nav className="flex-1 overflow-hidden px-3 hover:overflow-y-auto">
        <Accordion type="single" collapsible>
          {sections?.map((section) => (
            <SidebarSection key={section.id} section={section} handleClick={handleClick}/>
          ))}
        </Accordion>
      </nav>
    </>
  )
}
