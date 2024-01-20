import React from "react"
import { IconStar, IconStarFilled } from "@tabler/icons-react"

import { Course } from "@/types/sidebar"

const AcademyCourseMain = ({ course }: { course: Course }) => {
  return (
    <div className="w-full bg-slate-900 min-h-[280px] rounded-l-xl p-4 flex flex-col">
      <div className="w-full">
        <span className="hover:text-blue-700 cursor-pointer">
          {course.academy_name}
        </span>
      </div>
      <h2 className="font-extrabold text-3xl mt-8 mb-3">{course.title}</h2>
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
