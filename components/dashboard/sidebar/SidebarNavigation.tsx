"use client"

import { Accordion } from "@/components/ui/accordion"

import { SidebarCategory } from "./SidebarCategory"
import { SidebarLink, SidebarNavigationProps } from "@/types/sidebar"

export const SidebarNavigation = ({ sidebarLinks, isSidebarOpen, handleClick }: SidebarNavigationProps) => {
  return (
    <>
      <nav className="flex-1 overflow-hidden hover:overflow-y-auto px-3">
        {isSidebarOpen ? (
          <Accordion type="single" collapsible>
            {sidebarLinks?.map((category) => {
              return (
                <SidebarCategory
                  key={category.category_key}
                  category={category}
                  handleClick={handleClick}
                />
              )
            })}
          </Accordion>
        ) : (
          <div className="mt-3">
            {sidebarLinks?.map((category: SidebarLink) => (
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
