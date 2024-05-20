import { useEffect, useState } from "react"
import { useUIStore } from "@/store/ui/ui-store"

import { GetCourseSectionsProps } from "@/types/hooks"
import { CourseSection } from "@/types/modals"

const useGetCourseSections = ({
  courseId,
  setLoadingCallback,
  flag,
  adminFlag,
}: GetCourseSectionsProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const [courseSections, setCourseSections] = useState<CourseSection[]>([])

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoadingCallback(true)
        const request = await fetch(
          `${baseUrl}/course_sections?course_id=${courseId}&admin_flag=${adminFlag}`,
          {
            method: "GET",
            credentials: "include",
          }
        )
        const response = await request.json()

        if (request.status === 200) {
          setCourseSections(response)
        } else {
          console.error("Error al obtener cursos:", response)
        }
      } catch (error) {
        console.error("Error de red:", error)
      } finally {
        setLoadingCallback(false)
      }
    }

    if (courseId) {
      getCourses()
    }
  }, [courseId, flag, setLoadingCallback])

  return courseSections
}

export default useGetCourseSections
