"use client"
import { useState } from "react"
import useGetCoursesInformation from "@/hooks/useGetCoursesInformation"
import { useParams } from "next/navigation"
import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import CertificateContent from "./CertificateContent"

export const Certificate = () => {
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
        <CertificateContent/>
      </div>
    </>
  )
}
export default Certificate
