"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import { IconCertificate } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import useGetCourse from "@/hooks/useGetCourse"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { toast } from "sonner"

export const SidebarEvaluation = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const baseUrl = useUIStore((state) => state.baseUrl)
  const router = useRouter()
  const { courseId } = useParams<{ courseId: string }>()
  const [loading, setLoading] = useState(true)
  const course = useGetCourse({
    setLoadingCallback: setLoading,
    courseId: courseId,
  })
  const user = useGetCurrentUser({
    setLoadingCallback: setLoading,
    baseUrl: baseUrl,
  })
  const goToEvaluation = async () => {
    try {
      const request = await fetch(`${baseUrl}/exams?course_test_id=${course?.course_test?.id}`, {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        credentials: "include",
        body: JSON.stringify({
          exam: {
            user_id: user?.id,
            course_test_id: course?.course_test?.id
          },
        }),
      })
      const response = await request.json()
      if (request.status == 200) {
        router.push(
          `/courses/${courseId}/users/${user?.id}/evaluation/${course?.course_test?.id}`
        )
      } else {
        toast.error('No se pudo redirigir al examen')
      }
      return response
    } catch (e) {
      console.log("error", e)
    }

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
