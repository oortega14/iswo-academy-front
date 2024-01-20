import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

import useGetCourses from "@/hooks/useGetCourses"

import CoursesCard from "../ui/CoursesCard"

const CoursesMosaic = () => {
  const params = useParams<{ academyId: string }>()
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const courses = useGetCourses({
    academyId: params.academyId,
    setLoadingCallback: setLoading,
  })
  const handleNavigate = (courseId: number) => {
    router.push(`/academies/${params.academyId}/courses/${courseId}`)
  }
  return (
    <div className="w-full bg-slate-200 text-blue-dark dark:bg-slate-900 dark:text-slate-200 py-8">
      <div className="pl-6 ">
        <h2 className="font-extrabold text-3xl">
          Los cursos que ofertamos en esta academia son:
        </h2>
      </div>
      <div className="w-full px-5 my-8">
        <hr className="border border-slate-950 dark:border-slate-200" />
      </div>
      <div className="flex">
        {courses.map((course) => (
          <div key={course.id} onClick={()=>handleNavigate(course.id)}>
            <CoursesCard
              imageUrl={course.banner}
              title={course.title}
              price={course.price}
              description={course.description}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CoursesMosaic
