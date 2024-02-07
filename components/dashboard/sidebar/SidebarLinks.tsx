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
import { SidebarNavigation } from "./SidebarNavigation"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { USER_TYPES } from "@/types/users"
import { buildRoute } from "@/lib/sidebarNavigation"

export const SidebarLinks = () => {
  const params = useParams<{ userId: string; courseId:string; academyId: string }>()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const baseUrl = useUIStore((state) => state.baseUrl)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading
  })
  //const currentUser = useUIStore((state) => state.currentUser)

  const handleClick = (
    categoryLabel: string,
    subcategoryLabel: string
  ) => {
    const route = buildRoute({
      category: categoryLabel,
      subcategory: subcategoryLabel,
      userId: params.userId,
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
        {currentUser?.role === USER_TYPES.STUDENT && (
          <SidebarNavigation sidebarLinks={STUDENT_SIDEBAR_LINKS} isSidebarOpen={isSidebarOpen} handleClick={handleClick}/>
        )}
        {currentUser?.role === USER_TYPES.TEACHER && (
          <SidebarNavigation sidebarLinks={TEACHER_SIDEBAR_LINKS} isSidebarOpen={isSidebarOpen} handleClick={handleClick}/>
        )}
        {currentUser?.role === USER_TYPES.ADMIN && (
          <SidebarNavigation sidebarLinks={ADMIN_SIDEBAR_LINKS} isSidebarOpen={isSidebarOpen} handleClick={handleClick} />
        )}
        {currentUser?.role === USER_TYPES.SUPER_ADMIN && (
          <SidebarNavigation sidebarLinks={SUPER_ADMIN_SIDEBAR_LINKS} isSidebarOpen={isSidebarOpen} handleClick={handleClick}/>
        )}
      </>
    )
  }
}
