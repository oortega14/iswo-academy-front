import { IconCheck } from "@tabler/icons-react"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Course } from "@/types/sidebar"
import useGetLessons from "@/hooks/useGetLessons"
import { useState } from "react"

const AcademyCourseContent = ({ course }: { course: Course }) => {
  const [loading, setLoading] = useState(true)
  const lessons = useGetLessons({
    setLoadingCallback: setLoading,
    courseId: JSON.stringify(course.id)
  })
  return (
    <div className="flex min-h-[280px] w-full flex-col rounded-l-xl p-4">
      <h2 className="mb-3 mt-8 text-3xl font-extrabold">
        Las lecciones de este curso son:
      </h2>
      <Table>
        <TableBody>
          {lessons.map((goal) => (
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

export default AcademyCourseContent
