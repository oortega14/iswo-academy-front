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
    <div className="w-full min-h-[280px] rounded-l-xl p-4 flex flex-col">
      <h2 className="font-extrabold text-3xl mt-8 mb-3">
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
