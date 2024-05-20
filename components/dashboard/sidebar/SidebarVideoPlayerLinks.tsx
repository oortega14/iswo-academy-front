"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"

import { buildRouteVPlayer } from "@/lib/sidebarNavigation"
import useGetCourseSections from "@/hooks/useGetCourseSections"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"

import { SidebarNavigationVideoPlayer } from "./SidebarNavigationVideoPlayer"

export const SidebarVideoPlayerLinks = () => {
  const { courseId, userId, academyId } = useParams<{
    userId: string
    courseId: string
    academyId: string
  }>()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const baseUrl = useUIStore((state) => state.baseUrl)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading,
  })
  //const currentUser = useUIStore((state) => state.currentUser)

  const courseSections = useGetCourseSections({
    setLoadingCallback: setLoading,
    courseId: courseId,
    adminFlag: false,
  })

  const handleClick = (sectionId: number, lessonId: number) => {
    const route = buildRouteVPlayer({
      sectionId: sectionId,
      lessonId: lessonId,
      courseId: courseId,
      academyId: academyId,
    })
    router.push(route)
  }

  if (loading) {
    return <span></span>
  } else {
    return (
      <>
        <SidebarNavigationVideoPlayer
          sections={courseSections}
          handleClick={handleClick}
        />
      </>
    )
  }
}
