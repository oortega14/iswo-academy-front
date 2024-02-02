import React from "react"
import { IconCheck, IconStarFilled } from "@tabler/icons-react"

import { Course } from "@/types/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

const AcademyCourseLearning = ({ course }: { course: Course }) => {
  return (
    <div className="flex min-h-[280px] w-full flex-col rounded-l-xl p-4">
      <h2 className="mb-3 mt-8 text-3xl font-extrabold">
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
