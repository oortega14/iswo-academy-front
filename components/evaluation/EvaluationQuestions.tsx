"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import { IconCircleDotFilled, IconDots } from "@tabler/icons-react"
import { toast } from "sonner"

import { EvaluationQuestionProps } from "@/types/evaluation"
import { SendQuestionOptionRequest } from "@/lib/requests"
import useGetExam from "@/hooks/useGetExam"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

import { MotionDiv } from "../animations/MotionDiv"
import Answers from "../courses/Answers"
import Stopwatch from "./StopWatch"

const EvaluationQuestions = ({
  exam,
  setApproved,
  setIsFinished,
  evaluation,
}: EvaluationQuestionProps) => {
  const { evaluationId, userId } = useParams<{
    evaluationId: string
    userId: string
  }>()
  const [loading, setLoading] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  const questionsLength = evaluation.questions.length
  const progressValue = (100 / questionsLength) * (questionIndex + 1)
  const baseUrl = useUIStore((state) => state.baseUrl)
  const [Answers, setAnswers] = useState(exam.exam_answers)

  const getExam = async () => {
    try {
      const request = await fetch(
        `${baseUrl}/exams/find_exam?course_test_id=${evaluationId}&user_id=${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
      const response = await request.json()
      if (request.status === 200) {
        setApproved(response.approved)
      }
    } catch (e) {}
  }

  const handleSubmitAnswer = async (optionId: number, questionId: number) => {
    const answerSelected = Answers.find(
      (answer) => answer.test_question_id === questionId
    )
    const answerId = answerSelected?.id
    const [request, response] = await SendQuestionOptionRequest(
      optionId,
      !!answerId ? answerId : 0
    )
    if (request.status === 200) {
      toast.success(response.message)
      if (questionIndex + 1 < questionsLength) {
        setQuestionIndex(questionIndex + 1)
      } else {
        getExam()
        setIsFinished(true)
      }
    }
  }

  if (loading) {
    return (
      <>
        <div>cargando</div>
      </>
    )
  }

  return (
    <div className="px-24">
      <div className="w-full justify-center">
        <Separator className="my-4" />
        <Stopwatch
          tiempoTotal={evaluation.time_limit}
          setIsFinished={setIsFinished}
        />
        <Separator className="my-4" />
      </div>
      <div className="flex w-full flex-col">
        <div className="flex w-full justify-start text-xl">
          <span>
            Pregunta {questionIndex + 1} de {questionsLength}
          </span>
        </div>
        <Progress value={progressValue} className="my-4 w-full" />
        <div className="flex w-full justify-center">
          <span className="text-xl">
            {evaluation.questions[questionIndex].question}
          </span>
        </div>
        <div className="flex w-full flex-col">
          {evaluation.questions[questionIndex].question_options.map(
            (option) => {
              return (
                <MotionDiv
                  key={option.id}
                  className="my-3 w-full cursor-pointer bg-slate-200 rounded-md"
                  whileTap={{ scale: 1.02 }}
                  whileHover={{ scale: 0.99 }}
                  onClick={() =>
                    handleSubmitAnswer(
                      option.id,
                      evaluation.questions[questionIndex].id
                    )
                  }
                >
                  <div className="flex w-full rounded-lg dark:bg-slate-200">
                    <div className="flex w-14 items-center justify-center rounded-l-xl p-2 text-black dark:bg-slate-300">
                      <IconCircleDotFilled className="size-4" />
                    </div>
                    <span className=" dark:text-blue-dark p-2">
                      {option.option_text}
                    </span>
                  </div>
                </MotionDiv>
              )
            }
          )}
        </div>
      </div>
    </div>
  )
}

export { EvaluationQuestions }
