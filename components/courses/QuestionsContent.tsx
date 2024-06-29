"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  IconArticle,
  IconCheck,
  IconEdit,
  IconEyeCheck,
  IconEyeX,
  IconList,
  IconQuestionMark,
  IconSchool,
  IconTextRecognition,
  IconTrash,
  IconX,
} from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"
import { toast } from "sonner"

import { Answer } from "@/types/courses"
import { addNewQuestionRequest, sendAnswersRequest } from "@/lib/requests"
import useGetCourse from "@/hooks/useGetCourse"
import useGetQuestions from "@/hooks/useGetQuestions"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import MotionButton from "../animations/MotionButton"
import { MotionDiv } from "../animations/MotionDiv"
import InputTextWithIcon from "../forms/InputTextWithIcon"
import DeleteLessonsModal from "../modals/DeleteLessonsModal"
import DeleteQuestionModal from "../modals/DeleteQuestionModal"
import EditLessonsModal from "../modals/EditLessonsModal"
import EditQuestionModal from "../modals/EditQuestionModal"
import { Button, buttonVariants } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"

const QuestionsContent = () => {
  const [data, setData] = useState({})
  const [answer, setAnswer] = useState("")
  const { courseId, userId, academyId, evaluationId } = useParams<{
    courseId: string
    userId: string
    academyId: string
    evaluationId: string
  }>()
  const [question, setQuestion] = useState("")
  const [newQuestionId, setNewQuestionId] = useState(0)
  const [questionFlag, setQuestionFlag] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [accordionOn, setAccordionOn] = useState(false)
  const [selectedQuestionId, setSelectedQuestionId] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [isCorrect, setIsCorrect] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [changeFlag, setChangeFlag] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null)
  const questions = useGetQuestions({
    evaluationId: evaluationId,
    setLoadingCallback: setLoading,
    flag: changeFlag,
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

  const handleClickQuestion = (id: number) => {
    router.push(
      `/admin/${userId}/academies/${academyId}/courses/${courseId}/evaluation/${id}/question/answers`
    )
  }

  // const handleNavigate = (e: string) => {
  //   router.push(
  //     `/admin/${userId}/academies/${academyId}/courses/${courseId}/evaluation/${course?.course_test?.id}/${e}`
  //   )
  // }

  //Questions

  const addNewQuestion = async () => {
    const [request, response] = await addNewQuestionRequest(
      question,
      evaluationId
    )
    if (request.status === 200) {
      setQuestionFlag(true)
      setNewQuestionId(response.id)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  // Answers
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAnswer(value)
  }

  const checkAnswer = (e: any) => {
    setIsCorrect(e)
  }

  const eraseAnswer = (idToDelete: number) => {
    const newAnswers = answers.filter((answer) => answer.id !== idToDelete)
    setAnswers(newAnswers)
  }

  const changeRightness = (idToEdit: number, state: boolean) => {
    const updatedAnswers = answers.map((answer) => {
      if (answer.id === idToEdit) {
        return { ...answer, right_answer: state }
      }
      return answer
    })
    setAnswers(updatedAnswers)
  }

  const changeAnswer = (
    idToEdit: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = e.target
    const updatedAnswers = answers.map((answer) => {
      if (answer.id === idToEdit) {
        return { ...answer, option_text: value }
      }
      return answer
    })
    setAnswers(updatedAnswers)
  }

  const handleInputChange = (
    idToEdit: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (typingTimeout !== null) {
      clearTimeout(typingTimeout)
    }
    const newTypingTimeout = setTimeout(() => {
      changeAnswer(idToEdit, e)
    }, 1000) as unknown as number

    setTypingTimeout(newTypingTimeout)
  }

  const addAnswer = (e: any) => {
    e.preventDefault()
    const answerToAddToState = {
      option_text: answer,
      right_answer: isCorrect,
      id: answers.length,
    }
    setAnswers([...answers, answerToAddToState])
    setInputValue("")
    setAnswer("")
  }

  const sendAnswers = async () => {
    const [request, response] = await sendAnswersRequest(answers, newQuestionId)
    if (request.status === 200) {
      window.location.reload()
      toast.success(response.message)
    }
  }

  return (
    <>
      <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6">
        {questionFlag && (
          <h1 className="ml-3 mt-4 text-2xl font-semibold">{question}</h1>
        )}
        <h2 className="ml-3 mt-4 font-semibold">
          A continuación puedes crear o modificar las preguntas de tu
          evaluación:
        </h2>
      </div>
      {questionFlag ? (
        <>
          <form
            className="flex w-full flex-col p-0 px-3"
            onSubmit={(e) => addAnswer(e)}
          >
            <InputTextWithIcon
              Icon={IconList}
              label="¿Cuales son las respuestas?"
              placeholder="Escribe aqui tu respuesta"
              name="answer"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                handleChangeAnswer(e)
              }}
            />

            <div className="my-3 flex items-center justify-start space-x-2">
              <div>
                <label htmlFor="answer"> ¿Es una respuesta correcta? </label>
                <Checkbox
                  onCheckedChange={(e) => checkAnswer(e)}
                  id="answer"
                  className="h-5 w-5"
                />
              </div>
              <MotionButton
                className="ml-20 w-full"
                onClick={(e) => addAnswer(e)}
              >
                Agregar respuesta
              </MotionButton>
            </div>
          </form>
          <Separator className="my-4 w-full"></Separator>
          <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 lg:flex-row lg:items-center lg:space-y-0">
            <h1 className="mt-2 text-xl font-semibold">Respuestas:</h1>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Acciones</TableHead>
                <TableHead className="w-2/4">Contenido</TableHead>
                <TableHead className="w-1/4">¿ Es correcta ?</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {answers.map((answer) => (
                <TableRow key={answer.option_text}>
                  <TableCell className="w-1/4 font-medium">
                    <MotionButton
                      variant={"ghost"}
                      className="border"
                      onClick={() => {
                        eraseAnswer(answer.id)
                      }}
                    >
                      <IconTrash></IconTrash>
                    </MotionButton>
                  </TableCell>
                  <TableCell className="w-2/4 font-medium">
                    <Input
                      name="option_text"
                      defaultValue={answer.option_text}
                      onChange={(e) => {
                        handleInputChange(answer.id, e)
                      }}
                    />
                  </TableCell>
                  <TableCell className="w-1/4 font-medium">
                    {answer.right_answer ? (
                      <IconCheck
                        className="ml-10 size-8 cursor-pointer rounded-lg border border-green-600 p-1 text-green-600"
                        onClick={() => changeRightness(answer.id, false)}
                      />
                    ) : (
                      <IconX
                        className="ml-10 size-8 cursor-pointer rounded-lg border border-red-600 p-1 text-red-600"
                        onClick={() => changeRightness(answer.id, true)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator className="mb-4 w-full"></Separator>
          <MotionButton className="mt-3 w-full" onClick={sendAnswers}>
            Finalizar de agregar respuestas
          </MotionButton>
        </>
      ) : (
        <>
          <TooltipProvider>
            <div className="flex w-full flex-col p-0 px-3">
              <InputTextWithIcon
                Icon={IconArticle}
                label="Agregar una nueva pregunta"
                placeholder="Escribe aqui tu pregunta"
                name="question"
                onChange={(e) => {
                  setQuestion(e.target.value)
                }}
              />
              <MotionButton
                className="mt-3 w-full"
                onClick={() => addNewQuestion()}
              >
                Agregar pregunta
              </MotionButton>
            </div>
            <Separator className="my-4 w-full"></Separator>
            <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 lg:flex-row lg:items-center lg:space-y-0">
              <h1 className="mt-2 text-xl font-semibold">
                Las preguntas de tu evaluación son:
              </h1>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Acciones</TableHead>
                  <TableHead className="w-2/3">Contenido</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="w-1/3 font-medium">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            onClick={() =>
                              editModalOpen
                                ? close(setEditModalOpen)
                                : open(setEditModalOpen, question.id)
                            }
                            className=" border-[1px]"
                          >
                            <IconEdit className=" size-6 " />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>Editar Pregunta</span>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild className="ml-4">
                          <Button
                            variant="ghost"
                            onClick={() =>
                              deleteModalOpen
                                ? close(setDeleteModalOpen)
                                : open(setDeleteModalOpen, question.id)
                            }
                            className=" border-[1px] border-red-600 text-red-600 hover:bg-red-900 hover:text-red-300"
                          >
                            <IconTrash className=" size-6 " />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>Eliminar Pregunta</span>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild className="ml-4">
                          <Link
                            href={`/admin/${userId}/academies/${academyId}/courses/${courseId}/evaluation/${evaluationId}/questions/${question.id}/answers`}
                          >
                            <Button variant="ghost" className=" border-[1px]">
                              <IconList className=" size-6 " />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>Editar Respuestas</span>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="w-2/3">{question.question}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
          <EditQuestionModal
            modalOpen={editModalOpen}
            close={() => close(setEditModalOpen)}
            questionId={selectedQuestionId}
            flag={changeFlag}
            setFlag={setChangeFlag}
          />
          <DeleteQuestionModal
            modalOpen={deleteModalOpen}
            questionId={selectedQuestionId}
            close={() => close(setDeleteModalOpen)}
            flag={changeFlag}
            setFlag={setChangeFlag}
          />
        </>
      )}
    </>
  )
}
export default QuestionsContent
