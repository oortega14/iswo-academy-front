import React from "react"
import { IconCheck, IconStarFilled } from "@tabler/icons-react"

import { Course } from "@/types/sidebar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const AcademyCourseLearning = ({ course }: { course: Course }) => {
  console.log(course)
  return (
    <div className="w-full min-h-[280px] rounded-l-xl p-4 flex flex-col">
      <h2 className="font-extrabold text-3xl mt-8 mb-3">
        Lo que aprenderas en este curso sera:
      </h2>
      <Table>
        <TableBody>
          {course.course_goals.map((goal) => (
            <TableRow key={goal.id}>
              <TableCell className="flex gap-x-2 font-medium">
                <IconCheck />
                {goal.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AcademyCourseLearning
