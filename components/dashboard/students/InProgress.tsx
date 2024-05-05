"use client"
import { useState } from "react"
import { HeaderDashboard } from "../content/HeaderDashboard"
import useGetCoursesInformation from "@/hooks/useGetCoursesInformation"
import { useParams } from "next/navigation"
import SharedContent from "./SharedContent"
import { COURSE_CARD_TITLES } from "@/constants"

export const InProgress = () => {
  const [loading, setLoading] = useState(true)
  const params = useParams<{userId: string}>()
  const inProgressCourses = useGetCoursesInformation({
    userId: params.userId,
    status: 1,
    setLoadingCallback: setLoading,
  })

  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <SharedContent
          courses={inProgressCourses}
          title={COURSE_CARD_TITLES.in_progress_title}
          course_condition={'inProgress'}
        />
      </div>
    </>
  )
}
export default InProgress
