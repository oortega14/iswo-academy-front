"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import useGetCourse from "@/hooks/useGetCourse"
import AcademyCourseContent from "@/components/academies/AcademyCourseContent"
import AcademyCourseLearning from "@/components/academies/AcademyCourseLearning"
import AcademyCourseSidebar from "@/components/academies/AcademyCourseSidebar"
import AcademyCourseMain from "@/components/academies/AcademyCourseMain"

export default function coursePage() {
  const params = useParams<{ academyId: string; courseId: string }>()
  const [loading, setLoading] = useState(true)
  const course = useGetCourse({
    courseId: params.courseId,
    setLoadingCallback: setLoading,
  })
  if (loading) return <span />
  else if (!!course) {
    return (
      <section className="px-20 flex ">
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
