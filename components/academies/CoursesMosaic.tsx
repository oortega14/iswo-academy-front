import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

import useGetCourses from "@/hooks/useGetCourses"

import CoursesCard from "../ui/CoursesCard"

const CoursesMosaic = () => {
  const params = useParams<{ academyId: string }>()
  const router = useRouter();
  const [changeFlag, setChangeFlag] = useState(false)
  const [loading, setLoading] = useState(true)
  const courses = useGetCourses({
    academyId: params.academyId,
    setLoadingCallback: setLoading,
    flag: changeFlag
  })
  const handleNavigate = (courseId: number) => {
    router.push(`/academies/${params.academyId}/courses/${courseId}`)
  }
  return (
    <div className="text-blue-dark w-full bg-slate-200 py-8 dark:bg-slate-900 dark:text-slate-200">
      <div className="pl-6 ">
        <h2 className="text-3xl font-extrabold">
          Los cursos que ofertamos en esta academia son:
        </h2>
      </div>
      <div className="my-8 w-full px-5">
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
