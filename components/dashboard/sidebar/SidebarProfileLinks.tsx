"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  PROFILE_SIDEBAR_LINKS,
} from "@/constants/sidebar-constants"
import { useUIStore } from "@/store/ui/ui-store"
import buildRoute from "@/lib/sidebar-navigation"
import useGetCourses from "@/hooks/useGetCourses"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { SidebarNavigation } from "./SidebarNavigation"

export const SidebarProfileLinks = () => {
  const params = useParams<{
    userId: string
    courseId: string
    academyId: string
  }>()
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
    setLoadingCallback: setLoading,
  })

  const handleClick = (categoryLabel: string, subcategoryLabel: string) => {
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
        <SidebarNavigation
          sidebarLinks={PROFILE_SIDEBAR_LINKS}
          isSidebarOpen={isSidebarOpen}
          handleClick={handleClick}
        />
      </>
    )
  }
}
