import { useState } from "react"
import {  IconCircle, IconCircleFilled, IconCrop169, IconLetterISmall  } from "@tabler/icons-react"
import { Course } from "@/types/sidebar"
import useGetCourseSections from "@/hooks/useGetCourseSections"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import LoadingModal from "../modals/LoadingModal"
import { IconList } from "@tabler/icons-react"

const AcademyCourseContent = ({ course }: { course: Course }) => {
  const [loading, setLoading] = useState(true)
  const courseSections = useGetCourseSections({
    setLoadingCallback: setLoading,
    courseId: JSON.stringify(course.id),
  })
  if (loading) {
    return <LoadingModal />
  }
  return (
    <div className="flex min-h-[280px] w-full flex-col rounded-l-xl p-4">
      <h2 className="mb-3 mt-8 text-3xl font-extrabold">
        Las lecciones de este curso son:
      </h2>
      <Accordion type="single" collapsible className="w-full ">
        {courseSections.map((section) => (
          <AccordionItem value={section.name} key={section.id} >
            <AccordionTrigger className="w-full flex px-3 justify-between items-center rounded-xl border">
              <IconLetterISmall className="size-5 rotate-90 "/>
              <span>{section.name}</span>
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableBody>
                  {section.lessons.map((lesson) => (
                    <TableRow key={lesson.id} >
                      <TableCell className="mt-2 ml-3 border rounded-xl flex items-center px-3">
                        <IconCircleFilled className="size-2 mr-4" />
                        {lesson.title}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default AcademyCourseContent
