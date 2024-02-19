import React from "react"
import { IconStar, IconStarFilled } from "@tabler/icons-react"

import { Course } from "@/types/sidebar"

const AcademyCourseMain = ({ course }: { course: Course }) => {
  return (
    <div className="flex min-h-[280px] w-full flex-col rounded-l-xl bg-slate-200 p-4 dark:bg-slate-900 dark:text-slate-200">
      <div className="w-full">
        <span className="cursor-pointer hover:text-blue-700">
          {course.academy_name}
        </span>
      </div>
      <h2 className="mb-3 mt-8 text-3xl font-extrabold">{course.title}</h2>
      <p className="mb-4">{course.description}</p>
      <span className="text-md mb-4">Creado por: {course.teacher}</span>
      <div className="text-md flex">
        <span className="mr-3">Puntuación:</span>
        {Array.from({ length: course.reviews }, (_, index) => (
          <IconStarFilled key={index} />
        ))}
      </div>
    </div>
  )
}

export default AcademyCourseMain
