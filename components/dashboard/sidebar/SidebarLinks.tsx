"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { SIDEBAR_LINKS } from "@/constants/sidebar-constants"
import { useUIStore } from "@/store/ui/ui-store"

import buildRoute from "@/lib/sidebar-navigation"
import useGetCourses from "@/hooks/useGetCourses"
import { Accordion } from "@/components/ui/accordion"

import { SidebarCategory } from "./SidebarCategory"

export const SidebarLinks = () => {
  const params = useParams<{ id: string; courseId: string }>()
  const [loading, setLoading] = useState<boolean>(false)
  const courses = useGetCourses({
    academyId: params.id,
    setLoadingCallback: setLoading})
  const router = useRouter()
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)

  const handleClick = (
    categoryLabel: string,
    subcategoryLabel: string | number
  ) => {
    const route = buildRoute({
      category: categoryLabel,
      subcategory: subcategoryLabel,
      id: params.id,
      courseId: params.courseId,
    })
    router.push(route)
  }
  if (loading) {
    return "cargando"
  } else {
    return (
      <>
        <nav className="flex-1 overflow-hidden hover:overflow-y-auto px-3">
          {isSidebarOpen ? (
            <Accordion type="single" collapsible>
              {SIDEBAR_LINKS.map((category) => {
                if (category.key !== "admin-courses" || !!params.courseId) {
                  return (
                    <SidebarCategory
                      key={category.key}
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
              {SIDEBAR_LINKS.map((category) => (
                <>
                  <div className="">
                    {!!category.icon && (
                      <div
                        className="flex justify-center w-full size-8 dark:hover:bg-white rounded-lg overflow-hidden dark:hover:text-blue-dark p-1 box-content mb-2 hover:bg-blue-dark hover:text-white cursor-pointer"
                        onClick={handleClick.bind(
                          null,
                          category.label,
                          'icon'
                        )}
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
}
