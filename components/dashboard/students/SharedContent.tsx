"use client"

import { SharedContentProps } from "@/types/courses"
import CoursesCard from "@/components/ui/CoursesCard"
import { useUIStore } from "@/store/ui/ui-store"
import { useRouter } from "next/navigation"

export const SharedContent = ({ courses, title }: SharedContentProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const router = useRouter()

  const checkSections = async (courseId: number) => {
    const request = await fetch(`${baseUrl}/course_sections?course_id=${courseId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const response = await request.json()
    router.push(`/courses/${courseId}/video-player/sections/${response[0].id}/lessons/${response[0].lessons[0].id}`)
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
          <div onClick={()=>checkSections(course.id)}>
            <CoursesCard
              imageUrl={course.banner}
              title={course.title}
              description={course.description}
              price={course.price}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default SharedContent
