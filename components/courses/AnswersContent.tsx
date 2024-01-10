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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { MotionButton } from "../animations/MotionButton"
import { Button, buttonVariants } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import useGetAnswers from "@/hooks/useGetAnswers"
import EditAnswerModal from "@/components/modals/EditAnswerModal"

const AnswersContent = () => {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [accordionOn, setAccordionOn] = useState(false)
  const [selectedQuestionId, setSelectedQuestionId] = useState(0)
  const [answerSelected, setAnswerSelected] = useState(0)
  const answers = useGetAnswers({
    questionId: Array.isArray(params.questionId)
      ? params.questionId[0]
      : params.questionId,
    setLoadingCallback: setLoading,
  })

  console.log(answers)

  const close = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setModalOpenFunction(false)
  }
  const open = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>,
    answerId: number
  ) => {
    setModalOpenFunction(true)
    setAnswerSelected(answerId)
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
            Editemos las respuestas de la pregunta seleccionada
          </h1>
        </div>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5 ">Acciones</TableHead>
              <TableHead className="w-4/5 ">Respuesta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {answers.map((answer) => (
              <>
                <TableRow key={answer.id}>
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
                                : open(setEditModalOpen, answer.id)
                            }
                            className=" border-[1px]"
                          >
                            <IconEdit className=" size-6 " />
                          </Button>
                        </MotionButton>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar respuesta</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="font-medium">
                    {answer.option_text}
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>

        <EditAnswerModal
          modalOpen={editModalOpen}
          close={() => close(setEditModalOpen)}
          answerId={answerSelected}
        />
      </TooltipProvider>
    </>
  )
}
export default AnswersContent
