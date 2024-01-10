"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import {
  IconEdit,
  IconEyeCheck,
  IconEyeX,
  IconTrash,
} from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"

import useGetLessons from "@/hooks/useGetLessons"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import Modal from "../ui/Modal"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import EditLessonsModal from "../modals/EditLessonsModal"
import DeleteLessonsModal from "../modals/DeleteLessonsModal"

const CourseContent = () => {
  const params = useParams()
  const [loading, setLoading] = useState<boolean>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedLessonId, setSelectedLessonId] = useState(0)
  const close = (setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>) => {
    setModalOpenFunction(false);
  };
  const open = (setModalOpenFunction : React.Dispatch<React.SetStateAction<boolean>>, lessonId: number) => {
    setModalOpenFunction(true);
    setSelectedLessonId(lessonId)
  };
  const lessons = useGetLessons({
    courseId: Array.isArray(params.courseId) ? params.courseId[0] : params.courseId,
    setLoadingCallback: setLoading
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
          <>
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
                      onClick={() => (editModalOpen ? close(setEditModalOpen) : open(setEditModalOpen, lesson.id))}
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
                      onClick={() => (deleteModalOpen ? close(setDeleteModalOpen) : open(setDeleteModalOpen, lesson.id))}
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
          </>
        ))}
      </Table>
      <div className="w-full mb-5 flex justify-center">
        <Button>
          Agregar nueva clase
        </Button>
      </div>
      <EditLessonsModal modalOpen={editModalOpen} close={() => close(setEditModalOpen)} lessonId={selectedLessonId}/>
      <DeleteLessonsModal modalOpen={deleteModalOpen} close={() => close(setDeleteModalOpen)} lessonId={selectedLessonId}/>

    </>
  )
}
export default CourseContent
