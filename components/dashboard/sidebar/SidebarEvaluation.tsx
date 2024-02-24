"use client"

import { useParams, useRouter } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import { IconCertificate } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import useGetCourse from "@/hooks/useGetCourse"
import { useState } from "react"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"

export const SidebarEvaluation = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const baseUrl = useUIStore((state) => state.baseUrl);
  const router = useRouter()
  const { courseId } = useParams<{ courseId: string }>()
  const [loading, setLoading] = useState(true)
  const course = useGetCourse({
    setLoadingCallback: setLoading,
    courseId: courseId
  })
  const user = useGetCurrentUser({
    setLoadingCallback: setLoading,
    baseUrl: baseUrl
  })
  const goToEvaluation = async () => {
    router.push(`/courses/${courseId}/users/${user?.id}/evaluation/${course?.course_test?.id}`)
  }

  return (
    <div>
      <button
        className="flex w-full items-center justify-center space-x-1 rounded-md border px-4 py-2 font-medium uppercase tracking-wider focus:outline-none focus:ring"
        onClick={goToEvaluation}
      >
        <IconCertificate />
        <span className={cn({ "lg:hidden": !isSidebarOpen })}>Evaluación</span>
      </button>
    </div>
  )
}

export default SidebarEvaluation
