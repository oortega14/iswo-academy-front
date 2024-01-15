"use client"

import { Accordion } from "@/components/ui/accordion"

import { SidebarCategory } from "./SidebarCategory"
import { SidebarLink, SidebarNavigationProps } from "@/types/sidebar"
import { useUIStore } from "@/store/ui/ui-store"

export const SidebarNavigation = ({ sidebarLinks, isSidebarOpen, handleClick }: SidebarNavigationProps) => {
  const openSidebar = useUIStore((state)=> state.changeSidebar)
  return (
    <>
      <nav className="flex-1 overflow-hidden px-3 hover:overflow-y-auto">
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
