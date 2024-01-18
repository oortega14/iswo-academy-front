"use client"

import CoursesCard from "@/components/ui/CoursesCard"
import { SharedContentProps } from "@/types/courses"

export const SharedContent = ({ courses, title }: SharedContentProps) => {
  return (
    <>
      <div className="flex flex-col items-start justify-between border-b pb-6 lg:flex-row lg:items-center lg:space-y-0 mt-5">
        <h1 className="ml-3 whitespace-nowrap text-2xl font-semibold ">
          {title}
        </h1>
      </div>
      <div className="flex justify-start items-center gap-x-3 m-4">
        {courses.map((course) => (
          <CoursesCard
            imageUrl={course.banner}
            title={course.title}
            description={course.description}
            price={course.price}
          />
        ))}
      </div>
    </>
  )
}

export default SharedContent
