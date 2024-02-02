"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { IconEdit, IconTrash } from "@tabler/icons-react"

import useGetStudents from "@/hooks/useGetStudents"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import MotionButton from "../animations/MotionButton"
import DeleteStudentModal from "../modals/DeleteStudentModal"
import { Button } from "../ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

const StudentsContent = () => {
  const params = useParams()
  const [loading, setLoading] = useState<boolean>()
  const [changeFlag, setChangeFlag] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedLessonId, setSelectedLessonId] = useState(0)
  const close = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setModalOpenFunction(false)
  }
  const open = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>,
    lessonId: number
  ) => {
    setModalOpenFunction(true)
    setSelectedLessonId(lessonId)
  }
  const students = useGetStudents({
    courseId: Array.isArray(params.courseId)
      ? params.courseId[0]
      : params.courseId,
    setLoadingCallback: setLoading,
  })

  return (
    <>
      <TooltipProvider>
        <div className="flex flex-col items-start justify-between space-y-4 border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
          <h1 className="ml-3 mt-4 whitespace-nowrap text-2xl font-semibold">
            Tus estudiantes:
          </h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5">Acciones</TableHead>
              <TableHead className="w-4/5">Nombre del estudiante</TableHead>
            </TableRow>
          </TableHeader>
          {students.map((student) => (
            <>
              <TableBody key={student.id}>
                <TableRow>
                  <TableCell className="flex gap-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <MotionButton
                          variant="ghost"
                          onClick={() =>
                            deleteModalOpen
                              ? close(setDeleteModalOpen)
                              : open(setDeleteModalOpen, student.id)
                          }
                          className="border-[1px]"
                        >
                          <IconTrash className=" size-6 " />
                        </MotionButton>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Eliminar Estudiante</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="font-medium">
                    {student.user_name}
                  </TableCell>
                </TableRow>
              </TableBody>
            </>
          ))}
        </Table>
      </TooltipProvider>
      <DeleteStudentModal
        modalOpen={deleteModalOpen}
        close={() => close(setDeleteModalOpen)}
        lessonId={selectedLessonId}
        flag={changeFlag}
        setFlag={setChangeFlag}
      />
    </>
  )
}
export default StudentsContent
