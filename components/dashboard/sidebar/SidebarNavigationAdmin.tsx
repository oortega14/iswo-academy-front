"use client"

import { Accordion } from "@/components/ui/accordion"
import { SidebarNavigationAdminProps } from "@/types/sidebar"
import { useParams } from "next/navigation"
import { SidebarCategoryAdmin } from "./SidebarCategoryAdmin"

export const SidebarNavigationAdmin = ({ sidebarLinks, isSidebarOpen, handleClick, courses }: SidebarNavigationAdminProps) => {
  const params = useParams()
  return (
    <>
      <nav className="flex-1 overflow-hidden hover:overflow-y-auto px-3">
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
                      className="flex justify-center w-full size-8 dark:hover:bg-white rounded-lg overflow-hidden dark:hover:text-blue-dark p-1 box-content mb-2 hover:bg-blue-dark hover:text-white cursor-pointer"
                      onClick={handleClick.bind(null, category.label, "icon")}
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
