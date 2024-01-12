"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ADMIN_SIDEBAR_LINKS,
  STUDENT_SIDEBAR_LINKS,
  SUPER_ADMIN_SIDEBAR_LINKS,
  TEACHER_SIDEBAR_LINKS,
} from "@/constants/sidebar-constants"
import { useUIStore } from "@/store/ui/ui-store"

import buildRoute from "@/lib/sidebar-navigation"
import useGetCourses from "@/hooks/useGetCourses"
import { SidebarNavigation } from "./SidebarNavigation"
import { SidebarNavigationAdmin } from "./SidebarNavigationAdmin"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"

export const SidebarLinks = () => {
  const params = useParams<{ id: string; courseId:string; academyId: string }>()
  const [loading, setLoading] = useState<boolean>(false)
  const courses = useGetCourses({
    academyId: params.academyId,
    setLoadingCallback: setLoading,
  })
  const router = useRouter()
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const baseUrl = useUIStore((state) => state.baseUrl)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading
  })

  const handleClick = (
    categoryLabel: string,
    subcategoryLabel: string | number
  ) => {
    const route = buildRoute({
      category: categoryLabel,
      subcategory: subcategoryLabel,
      userId: params.id,
      academyId: params.academyId,
      courseId: params.courseId,
    })
    router.push(route)
  }

  if (loading) {
    return <span></span>
  } else {
    return (
      <>
        {currentUser?.role === 'Estudiante' && (
          <SidebarNavigation sidebarLinks={STUDENT_SIDEBAR_LINKS} isSidebarOpen={isSidebarOpen} handleClick={handleClick}/>
        )}
        {currentUser?.role === 'Profesor' && (
          <SidebarNavigation sidebarLinks={TEACHER_SIDEBAR_LINKS} isSidebarOpen={isSidebarOpen} handleClick={handleClick}/>
        )}
        {currentUser?.role === 'Administrador' && (
          <SidebarNavigationAdmin sidebarLinks={ADMIN_SIDEBAR_LINKS} isSidebarOpen={isSidebarOpen} handleClick={handleClick} courses={courses}/>
        )}
        {currentUser?.role === 'Súper Administrador' && (
          <SidebarNavigation sidebarLinks={SUPER_ADMIN_SIDEBAR_LINKS} isSidebarOpen={isSidebarOpen} handleClick={handleClick}/>
        )}
      </>
    )
  }
}
