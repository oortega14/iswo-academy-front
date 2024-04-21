import { useEffect, useState } from "react"
import { useUIStore } from "@/store/ui/ui-store"

import { Student } from "@/types/courses"
import { GetStudentProps } from "@/types/hooks"

const useGetStudent = ({
  setLoadingCallback,
  flag,
  courseId,
}: GetStudentProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const [student, setStudent] = useState<Student[]>()

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoadingCallback(true)
        const request = await fetch(
          `${baseUrl}/students/course_info?course_id=${courseId}`,
          {
            method: "GET",
            credentials: "include",
          }
        )
        const response = await request.json()
        if (request.status === 200) {
          setStudent(response)
        } else {
          console.error("Error al obtener el estudiante:", response)
        }
      } catch (error) {
        console.error("Error de red:", error)
      } finally {
        setLoadingCallback(false)
      }
    }
    if (!!courseId) {
      getCourses()
    }
  }, [setLoadingCallback, flag])

  return student
}

export default useGetStudent
