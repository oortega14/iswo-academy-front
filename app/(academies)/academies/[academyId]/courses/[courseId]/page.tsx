"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import useGetCourse from "@/hooks/useGetCourse"
import AcademyCourseContent from "@/components/academies/AcademyCourseContent"
import AcademyCourseLearning from "@/components/academies/AcademyCourseLearning"
import AcademyCourseSidebar from "@/components/academies/AcademyCourseSidebar"
import AcademyCourseMain from "@/components/academies/AcademyCourseMain"
import LoadingModal from "@/components/modals/LoadingModal"

export default function CoursePage() {
  const params = useParams<{ academyId: string; courseId: string }>()
  const [loading, setLoading] = useState(true)
  const course = useGetCourse({
    courseId: params.courseId,
    setLoadingCallback: setLoading,
  })
  if (loading) return <LoadingModal/>
  else if (!!course) {
    return (
      <section className="flex px-20 ">
        <div className="w-2/3 space-y-3">
          <AcademyCourseMain course={course} />
          <AcademyCourseLearning course={course} />
          <AcademyCourseContent course={course} />
        </div>
        <div className="w-1/3">
          <AcademyCourseSidebar course={course} />
        </div>
      </section>
    )
  }
}
