"use client"

import CoursesCard from "@/components/ui/CoursesCard"
import { SharedContentProps } from "@/types/courses"

export const SharedContent = ({ courses, title }: SharedContentProps) => {
  return (
    <>
      <div className="mt-5 flex flex-col items-start justify-between border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
        <h1 className="ml-3 whitespace-nowrap text-2xl font-semibold ">
          {title}
        </h1>
      </div>
      <div className="m-4 flex items-center justify-start gap-x-3">
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
