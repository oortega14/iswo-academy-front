"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  IconArticle,
  IconEdit,
  IconEyeCheck,
  IconEyeX,
  IconList,
  IconTrash,
} from "@tabler/icons-react"

import useGetQuestions from "@/hooks/useGetQuestions"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { MotionButton } from "../animations/MotionButton"
import { MotionDiv } from "../animations/MotionDiv"
import DeleteLessonsModal from "../modals/DeleteLessonsModal"
import EditLessonsModal from "../modals/EditLessonsModal"
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
import EditQuestionModal from "../modals/EditQuestionModal"
import DeleteQuestionModal from "../modals/DeleteQuestionModal"

const EvaluationContent = () => {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [accordionOn, setAccordionOn] = useState(false)
  const [selectedQuestionId, setSelectedQuestionId] = useState(0)
  const questions = useGetQuestions({
    courseId: Array.isArray(params.courseId)
      ? params.courseId[0]
      : params.courseId,
    setLoadingCallback: setLoading,
  })

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

  const handleSubmit = (e) => {
    console.log(e)
  }

  const handleChange = (e) => {
    console.log(e)
  }

  const handleClickQuestion = (id: number) => {
    router.push(`/academies/${params.id}/courses/${params.courseId}/evaluation/${id}/question/answers`)
  }

  return (
    <>
      <TooltipProvider>
        <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row px-3">
          <h1 className="text-2xl font-semibold whitespace-nowrap mt-4 ml-3">
            Vamos a configurar la evaluación de tu curso
          </h1>
        </div>
        <form
          className="flex flex-col p-0 w-full px-3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="rounded-full flex items-center justify-start w-full mt-3">
            <IconArticle className="size-5 mr-2" />
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
          />
          <div className="rounded-full flex items-center justify-start w-full mt-3">
            <IconArticle className="size-5 mr-2" />
            <label htmlFor="description">
              ¿Cuantas respuestas correctas son requeridas para aprobar el
              examen?
            </label>
          </div>
          <Input
            type="number"
            placeholder="Escribe aqui el numero minimo de respuestas"
            name="title"
            onChange={(e) => handleChange(e)}
            className="mt-2"
          />
          <MotionButton whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.15 }}>
            <Button className="mt-3">Actualizar información</Button>
          </MotionButton>
        </form>
        <Separator className="my-3" />
        <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row px-3">
          <h2 className="text-xl font-semibold whitespace-nowrap mt-3">
            Estas son las preguntas de tu curso:
          </h2>
        </div>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-2/5 lg:w-2/6">Acciones</TableHead>
              <TableHead className="w-3/5 lg:w-4/6">Pregunta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question) => (
              <>
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
                                : open(setEditModalOpen, question.id)
                            }
                            className=" border-[1px]"
                          >
                            <IconEdit className=" size-6 " />
                          </Button>
                        </MotionButton>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar pregunta</p>
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
                                : open(setDeleteModalOpen, question.id)
                            }
                            className="border-[1px]"
                          >
                            <IconTrash className=" size-6 " />
                          </Button>
                        </MotionButton>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Borrar pregunta</p>
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
                            onClick={() => handleClickQuestion(question.id)}
                            className="border-[1px]"
                          >
                            <IconList className=" size-6 " />
                          </Button>
                        </MotionButton>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar respuestas</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="font-medium">
                    {question.question}
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>

        <EditQuestionModal
          modalOpen={editModalOpen}
          close={() => close(setEditModalOpen)}
          questionId={selectedQuestionId}
        />
        <DeleteQuestionModal
          modalOpen={deleteModalOpen}
          close={() => close(setDeleteModalOpen)}
          questionId={selectedQuestionId}
        />
      </TooltipProvider>
    </>
  )
}
export default EvaluationContent
