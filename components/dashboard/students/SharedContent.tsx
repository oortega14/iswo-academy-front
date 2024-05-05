"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import { SharedContentProps } from "@/types/courses"
import CoursesCard from "@/components/ui/CoursesCard"

export const SharedContent = ({ courses, title, course_condition }: SharedContentProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [changeFlag, setChangeFlag] = useState(false)
  const [courseState, setCourseState] = useState({
    in_progress: false,
    of_interest: false,
  })

  const checkSections = async (courseId: number) => {
    const first_request = await fetch(
      `${baseUrl}/students/course_info?course_id=${courseId}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
    const first_response = await first_request.json()
    if (first_response.course_status === 'of_interest') {
      router.push(`/academies/${first_response.academy_id}/courses/${courseId}`)
    } else if (first_response.course_status === 'in_progress' || 'ended') {
      const request = await fetch(`${baseUrl}/course_sections?course_id=${courseId}`, {
        method: 'GET',
        credentials: 'include',
      })
      const response = await request.json()
      router.push(`/courses/${courseId}/video-player/sections/${response[0].id}/lessons/${response[0].lessons[0].id}`)
    }
  }

  return (
    <>
      <div className="mt-5 flex flex-col items-start justify-between border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
        <h1 className="ml-3 whitespace-nowrap text-2xl font-semibold ">
          {title}
        </h1>
      </div>
      <div className="m-4 flex items-center justify-start gap-x-3">
        {courses.map((course) => (
          <div onClick={() => checkSections(course.id)}>
            <CoursesCard
              imageUrl={course.banner}
              title={course.title}
              description={course.description}
              price={course.price}
              course_condition={course_condition}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default SharedContent
