"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { COURSE_CARD_TITLES } from "@/constants"

import useGetCoursesInformation from "@/hooks/useGetCoursesInformation"

import { HeaderDashboard } from "../content/HeaderDashboard"
import SharedContent from "./SharedContent"

export const Acquired = () => {
  const [loading, setLoading] = useState(true)
  const params = useParams<{ userId: string }>()
  const inProgressCourses = useGetCoursesInformation({
    userId: params.userId,
    status: 0,
    setLoadingCallback: setLoading,
  })
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard />
        <SharedContent
          courses={inProgressCourses}
          title={COURSE_CARD_TITLES.acquired_title}
        />
      </div>
    </>
  )
}
export default Acquired
