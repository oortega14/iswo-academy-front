"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  IconEdit,
  IconTrash,
} from "@tabler/icons-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "../ui/button"
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
import DeleteAnswerModal from "../modals/DeleteAnswerModal"
const AnswersContent = () => {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [changeFlag, setChangeFlag] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [accordionOn, setAccordionOn] = useState(false)
  const [selectedQuestionId, setSelectedQuestionId] = useState(0)
  const [answerSelected, setAnswerSelected] = useState(0)
  const answers = useGetAnswers({
    questionId: Array.isArray(params.questionId)
      ? params.questionId[0]
      : params.questionId,
    setLoadingCallback: setLoading,
    flag: changeFlag
  })

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

  const handleSubmit = (e: any) => {
    console.log(e)
  }

  const handleChange = (e: any) => {
    console.log(e)
  }

  const handleClickQuestion = (id: number) => {
    router.push(`/academies/${params.id}/courses/${params.courseId}/evaluation/${id}/question/answers`)
  }

  return (
    <>
      <TooltipProvider>
        <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 lg:flex-row lg:items-center lg:space-y-0">
          <h1 className="ml-3 mt-4 whitespace-nowrap text-2xl font-semibold">
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
                        <Button
                            variant="ghost"
                            onClick={() =>
                              editModalOpen
                                ? close(setEditModalOpen)
                                : open(setEditModalOpen, answer.id)
                            }
                            className=" border-[1px]"
                          >
                            <IconEdit className=" size-6 " />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar respuesta</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                            variant="destructive"
                            onClick={() =>
                              deleteModalOpen
                                ? close(setDeleteModalOpen)
                                : open(setDeleteModalOpen, answer.id)
                            }
                            className=" border-[1px]"
                          >
                            <IconTrash className=" size-6 " />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Eliminar respuesta</p>
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
          flag={changeFlag}
          setFlag={setChangeFlag}
        />
        <DeleteAnswerModal
          modalOpen={deleteModalOpen}
          close={() => close(setDeleteModalOpen)}
          answerId={answerSelected}
          flag={changeFlag}
          setFlag={setChangeFlag}
        />
      </TooltipProvider>
    </>
  )
}
export default AnswersContent
