"use client"

import { Accordion } from "@/components/ui/accordion"
import { SidebarNavigationAdminProps } from "@/types/sidebar"
import { useParams } from "next/navigation"
import { SidebarCategoryAdmin } from "./SidebarCategoryAdmin"
import { useUIStore } from "@/store/ui/ui-store"

export const SidebarNavigationAdmin = ({ sidebarLinks, isSidebarOpen, handleClick, courses }: SidebarNavigationAdminProps) => {
  const openSidebar = useUIStore((state)=> state.changeSidebar)
  const params = useParams()
  return (
    <>
      <nav className="flex-1 overflow-hidden px-3 hover:overflow-y-auto">
        {isSidebarOpen ? (
          <Accordion type="single" collapsible>
            {sidebarLinks?.map((category) => {
              if (category.category_key !== "admin-edit-courses" || !!params.courseId) {
                return (
                  <SidebarCategoryAdmin
                    key={category.category_key}
                    category={category}
                    courses={courses}
                    handleClick={handleClick}
                  />
                )
              }
            })}
          </Accordion>
        ) : (
          <div className="mt-3">
            {sidebarLinks?.map((category) => (
              <>
                <div key={category.category_key}>
                  {!!category.icon && (
                    <div
                      className="dark:hover:text-blue-dark hover:bg-blue-dark mb-2 box-content flex size-8 w-full cursor-pointer justify-center overflow-hidden rounded-lg p-1 hover:text-white dark:hover:bg-white"
                      onClick={()=>(openSidebar())}
                    >
                      <category.icon />
                    </div>
                  )}
                </div>
              </>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
