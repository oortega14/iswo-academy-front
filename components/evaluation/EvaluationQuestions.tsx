"use client"

import { useState } from "react"
import { IconCircleDotFilled, IconDots } from "@tabler/icons-react"

import { EvaluationQuestionProps } from "@/types/evaluation"
import { SendQuestionOptionRequest } from "@/lib/requests"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { MotionDiv } from "../animations/MotionDiv"
import Stopwatch from "./StopWatch"
import { toast } from "sonner"
import useGetExam from "@/hooks/useGetExam"
import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import Answers from '../courses/Answers';



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
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [Answers, setAnswers] = useState(exam.exam_answers)

  const getExam = async () => {
    try {
      const request = await fetch(`${baseUrl}/exams/find_exam?course_test_id=${evaluationId}&user_id=${userId}`,{
        method: 'GET',
        credentials: 'include',
      });
      const response = await request.json()
      if (request.status === 200) {
        setApproved(response.approved)
      }
    } catch (e) {
    }
  }

  const handleSubmitAnswer = async (optionId: number, questionId: number) => {
    const answerSelected = Answers.find(answer => answer.test_question_id === questionId)
    const answerId = answerSelected?.id
    const [request, response] = await SendQuestionOptionRequest(
      optionId,
      !!answerId ? answerId : 0
    )
    if (request.status === 200) {
      toast.success(response.message)
      if ((questionIndex + 1) < questionsLength) {
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
        <Stopwatch tiempoTotal={evaluation.time_limit} />
        <Separator className="my-4" />
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-start text-xl">
          <span>
            Pregunta {questionIndex + 1} de {questionsLength}
          </span>
        </div>
        <Progress value={progressValue} className="w-full my-4" />
        <div className="w-full flex justify-center">
          <span className="text-xl">
            {evaluation.questions[questionIndex].question}
          </span>
        </div>
        <div className="flex flex-col w-full">
          {evaluation.questions[questionIndex].question_options.map(
            (option) => {
              return (
                <MotionDiv
                  key={option.id}
                  className="w-full my-3 cursor-pointer"
                  whileTap={{ scale: 1.02 }}
                  whileHover={{ scale: 0.99 }}
                  onClick={() =>
                    handleSubmitAnswer(
                      option.id,
                      evaluation.questions[questionIndex].id
                    )
                  }
                >
                  <div className="w-full flex dark:bg-slate-200 rounded-lg">
                    <div className="text-black p-2 dark:bg-slate-300 w-14 rounded-l-xl flex justify-center items-center">
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
