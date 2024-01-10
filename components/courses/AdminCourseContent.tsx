"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  IconEdit,
  IconEyeCheck,
  IconEyeX,
  IconTrash,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import useGetLessons from "@/hooks/useGetLessons"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MotionButton } from "../animations/MotionButton"
import DeleteLessonsModal from "../modals/DeleteLessonsModal"
import EditLessonsModal from "../modals/EditLessonsModal"
import { Button, buttonVariants } from "../ui/button"

const CourseContent = () => {
  const params = useParams()
  const [loading, setLoading] = useState<boolean>()
  const [editModalOpen, setEditModalOpen] = useState(false)
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
  const lessons = useGetLessons({
    courseId: Array.isArray(params.courseId)
      ? params.courseId[0]
      : params.courseId,
    setLoadingCallback: setLoading,
  })

  function truncarTexto(texto: string, longitudMaxima: number) {
    if (texto.length > longitudMaxima) {
      return texto.slice(0, longitudMaxima) + "..."
    } else {
      return texto
    }
  }
  console.log(lessons)
  return (
    <>
      <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
        <h1 className="text-2xl font-semibold whitespace-nowrap mt-4 ml-3">
          Tus lecciones:
        </h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Acciones</TableHead>
            <TableHead className="w-1/5">Titulo de la clase</TableHead>
            <TableHead className="w-1/2">Descripción</TableHead>
            <TableHead className="w-1/5">Es visible</TableHead>
          </TableRow>
        </TableHeader>
        {lessons.map((lesson) => (
          <div key={lesson.id}>
            <TableBody>
              <TableRow>
                <TableCell className="flex gap-x-2">
                  <MotionButton
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        editModalOpen
                          ? close(setEditModalOpen)
                          : open(setEditModalOpen, lesson.id)
                      }
                      className=" border-[1px]"
                    >
                      <IconEdit className=" size-6 " />
                    </Button>
                  </MotionButton>
                  <MotionButton
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        deleteModalOpen
                          ? close(setDeleteModalOpen)
                          : open(setDeleteModalOpen, lesson.id)
                      }
                      className="border-[1px]"
                    >
                      <IconTrash className=" size-6 " />
                    </Button>
                  </MotionButton>
                </TableCell>
                <TableCell className="font-medium">{lesson.title}</TableCell>
                <TableCell>{truncarTexto(lesson.description, 100)}</TableCell>
                <TableCell>
                  {lesson.visible === true ? (
                    <div className="flex gap-x-2 items-center">
                      <IconEyeCheck className="text-green-600" />
                      <span>Si</span>
                    </div>
                  ) : (
                    <div className="flex gap-x-2 items-center">
                      <IconEyeX className="text-red-600" />
                      <span>No</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </div>
        ))}
      </Table>
      <div className="w-full mb-5 flex justify-center">
        <MotionButton whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.15 }}>
          <Link
            href={`/academies/${params.id}/courses/${params.courseId}/create-class`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Agregar nueva clase
          </Link>
        </MotionButton>
      </div>
      <EditLessonsModal
        modalOpen={editModalOpen}
        close={() => close(setEditModalOpen)}
        lessonId={selectedLessonId}
      />
      <DeleteLessonsModal
        modalOpen={deleteModalOpen}
        close={() => close(setDeleteModalOpen)}
        lessonId={selectedLessonId}
      />
    </>
  )
}
export default CourseContent
