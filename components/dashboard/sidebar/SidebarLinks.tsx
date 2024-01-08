"use client"

import { useRouter } from "next/navigation"
import { SIDEBAR_LINKS } from "@/constants/sidebar-constants"
import { useUIStore } from "@/store/ui/ui-store"
import buildRoute from "@/lib/sidebar-navigation"
import useGetCourses from "@/hooks/useGetCourses"
import { Accordion } from "@/components/ui/accordion"
import { SidebarProps } from "./Sidebar"
import { useState } from "react"
import { SidebarCategory } from "./SidebarCategory"

export const SidebarLinks = ({ id }: SidebarProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const courses = useGetCourses(id, setLoading)
  const router = useRouter()
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)

  const handleClick = (categoryLabel: string, subcategoryLabel: string) => {
    const route = buildRoute(categoryLabel, subcategoryLabel, id)
    router.push(route)
  }
  if (loading) {
    return 'cargando'
  } else {
    return (
      <>
        <nav className="flex-1 overflow-hidden hover:overflow-y-auto px-3">
          {isSidebarOpen ? (
            <Accordion type="single" collapsible>
              {SIDEBAR_LINKS.map((category) => (
                <SidebarCategory
                  key={category.key}
                  category={category}
                  courses={courses}
                  handleClick={handleClick}
                />
              ))}
            </Accordion>
          ) : (
            <>
              {SIDEBAR_LINKS.map((category) => (
                <>
                  {!!category.icon && <category.icon />}
                </>
              ))}
            </>
          )}
        </nav>
      </>
    )
  }
}
