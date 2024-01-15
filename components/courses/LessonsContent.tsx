"use client"

import { MouseEvent, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  IconCertificate,
  IconEdit,
  IconEyeCheck,
  IconEyeX,
  IconHelp,
  IconSchool,
  IconTextRecognition,
  IconTrash,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import useGetLessons from "@/hooks/useGetLessons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { MotionButton } from "../animations/MotionButton"
import { MotionDiv } from "../animations/MotionDiv"
import DeleteLessonsModal from "../modals/DeleteLessonsModal"
import EditLessonsModal from "../modals/EditLessonsModal"
import { Button, buttonVariants } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import AnswersContent from "./AnswersContent"

const LessonsContent = () => {
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

  const handleNavigate = (e: any) => {
    console.log(e.currentTarget.id)
  }
  function truncarTexto(texto: string, longitudMaxima: number) {
    if (texto.length > longitudMaxima) {
      return texto.slice(0, longitudMaxima) + "..."
    } else {
      return texto
    }
  }

  return (
    <>
      <TooltipProvider>
        <div className="flex flex-col items-start justify-between space-y-4 border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
          <h1 className="ml-3 mt-4 whitespace-nowrap text-2xl font-semibold">
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
              <TableBody key={lesson.id}>
                <TableRow>
                  <TableCell className="flex gap-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
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
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar Lección</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
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
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Eliminar Lección</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="font-medium">{lesson.title}</TableCell>
                  <TableCell>{truncarTexto(lesson.description, 100)}</TableCell>
                  <TableCell>
                    {lesson.visible === true ? (
                      <div className="flex items-center gap-x-2">
                        <IconEyeCheck className="text-green-600" />
                        <span>Si</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-x-2">
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
        <div className="mb-5 flex w-full justify-center">
          <MotionButton whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.15 }}>
            <Link
              href={`/academies/${params.id}/courses/${params.courseId}/create-class`}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Agregar nueva clase
            </Link>
          </MotionButton>
        </div>
      </TooltipProvider>
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
export default LessonsContent
