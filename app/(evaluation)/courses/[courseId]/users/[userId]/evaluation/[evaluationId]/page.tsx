"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import useGetExam from "@/hooks/useGetExam"
import EvaluationBody from "@/components/evaluation/EvaluationBody"
import { ExamPassed } from "@/components/evaluation/ExamPassed"

export default function EvaluationPage() {
  const { courseId, evaluationId, userId } = useParams<{
    courseId: string
    evaluationId: string
    userId: string
  }>()
  const [loading, setLoading] = useState(true)
  const exam = useGetExam({
    setLoadingCallback: setLoading,
    evaluationId: evaluationId,
    userId: userId,
  })

  console.log(exam)

  return (
    <section className="mt-10 flex w-full justify-center">
      {exam?.approved ? (
        <div>
          <ExamPassed />
        </div>
      ) : (
        <div className="w-full">{!!exam && <EvaluationBody exam={exam} />}</div>
      )}
    </section>
  )
}
