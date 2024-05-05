"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { IconCheck, IconEdit, IconTrash, IconX } from "@tabler/icons-react"
import useGetQuestion from "@/hooks/useGetQuestion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import EditAnswerModal from "@/components/modals/EditAnswerModal"
import DeleteAnswerModal from "../modals/DeleteAnswerModal"
import { Button } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import useGetComplexAnswers from "@/hooks/useGetComplexAnswers"

const AnswersContent = () => {
  const { questionId } = useParams<{
    questionId: string
  }>()

  const [loading, setLoading] = useState<boolean>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [changeFlag, setChangeFlag] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [answerSelected, setAnswerSelected] = useState(0)
  const answers = useGetComplexAnswers({
    questionId: questionId,
    setLoadingCallback: setLoading,
    flag: changeFlag,
  })

  const question = useGetQuestion({
    questionId: questionId,
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

  return (
    <>
      <TooltipProvider>
        <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6">
          <h1 className="ml-3 mt-4 text-2xl font-semibold">{question?.question}</h1>
          <h2 className="ml-3 mt-4 whitespace-nowrap font-semibold">
            Editemos las respuestas de la pregunta seleccionada
          </h2>
        </div>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5 ">Acciones</TableHead>
              <TableHead className="w-3/5 ">Respuesta</TableHead>
              <TableHead className="w-1/5 ">¿Es correcta?</TableHead>
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
                  <TableCell className="font-medium">
                    {answer.right_answer ? (
                      <IconCheck className="ml-10 size-8 rounded-lg border border-green-600 p-1 text-green-600" />
                    ) : (
                      <IconX className="ml-10 size-8 rounded-lg border border-red-600 p-1 text-red-600" />
                    )}
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
