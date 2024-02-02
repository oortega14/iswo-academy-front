"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  IconArticle,
  IconEdit,
  IconEyeCheck,
  IconEyeX,
  IconList,
  IconQuestionMark,
  IconSchool,
  IconTextRecognition,
  IconTrash,
} from "@tabler/icons-react"

import useGetCourse from "@/hooks/useGetCourse"
import useGetQuestions from "@/hooks/useGetQuestions"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import MotionButton from "../animations/MotionButton"
import { MotionDiv } from "../animations/MotionDiv"
import DeleteLessonsModal from "../modals/DeleteLessonsModal"
import DeleteQuestionModal from "../modals/DeleteQuestionModal"
import EditLessonsModal from "../modals/EditLessonsModal"
import EditQuestionModal from "../modals/EditQuestionModal"
import { Button, buttonVariants } from "../ui/button"
import { Input } from "../ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

const EvaluationContent = () => {
  const { courseId, userId, academyId } = useParams<{
    courseId: string
    userId: string
    academyId: string
  }>()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>()
  const course = useGetCourse({
    courseId: courseId,
    setLoadingCallback: setLoading,
  })
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [accordionOn, setAccordionOn] = useState(false)
  const [selectedQuestionId, setSelectedQuestionId] = useState(0)

  const close = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setModalOpenFunction(false)
  }
  const open = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>,
    questionId: number
  ) => {
    setModalOpenFunction(true)
    setSelectedQuestionId(questionId)
  }

  const handleSubmit = (e: any) => {
    console.log(e)
  }

  const handleChange = (e: any) => {
    console.log(e)
  }

  const handleClickQuestion = (id: number) => {
    router.push(
      `/admin/${userId}/academies/${academyId}/courses/${courseId}/evaluation/${id}/question/answers`
    )
  }

  const handleNavigate = (e: string) => {
    router.push(
      `/admin/${userId}/academies/${academyId}/courses/${courseId}/evaluation/${course?.course_test?.id}/${e}`
    )
  }

  return (
    <>
      <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 lg:flex-row lg:items-center lg:space-y-0">
        <h1 className="ml-3 mt-4 whitespace-nowrap text-2xl font-semibold">
          Vamos a configurar la evaluación de tu curso
        </h1>
      </div>
      <form
        className="flex w-full flex-col p-0 px-3"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconArticle className="mr-2 size-5" />
          <label htmlFor="title">
            ¿Cual es el tiempo limite para realizar la evaluacion?
          </label>
        </div>
        <Input
          type="number"
          placeholder="Escribe aqui el tiempo en minutos"
          name="title"
          onChange={(e) => handleChange(e)}
          className="mt-2"
          defaultValue={course?.course_test?.time_limit || ""}
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconArticle className="mr-2 size-5" />
          <label htmlFor="description">
            ¿Cuantas respuestas correctas son requeridas para aprobar el examen?
          </label>
        </div>
        <Input
          type="number"
          placeholder="Escribe aqui el numero minimo de respuestas"
          name="title"
          onChange={(e) => handleChange(e)}
          className="mt-2"
          defaultValue={course?.course_test?.approve_with || ""}
        />
        <MotionButton className="mt-3 w-full">
          Actualizar información
        </MotionButton>
      </form>
      <Separator className="my-3" />
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 px-4">
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            className="cursor-pointer"
            onClick={(e) => handleNavigate('questions')}
          >
            <div className="relative flex flex-col rounded-xl border-2 bg-clip-border shadow-md">
              <div className="relative mx-4 -mt-4 grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-red-600 to-red-400 bg-clip-border text-white shadow-lg shadow-red-500/40">
                <IconQuestionMark />
              </div>
              <div className="p-4 ">
                <h4 className="text-blue-gray-900 block font-sans text-2xl font-semibold leading-snug tracking-normal antialiased">
                  Preguntas
                </h4>
              </div>
              <div className="border-blue-gray-50 border-t p-4">
                <p className="text-blue-gray-600 block font-sans text-base font-normal leading-relaxed text-muted-foreground antialiased">
                  Aqui podras crear o modificar las preguntas de tu evaluación
                </p>
              </div>
            </div>
          </MotionDiv>
        </div>
    </>
  )
}
export default EvaluationContent
