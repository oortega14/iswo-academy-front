"use client"

import { useParams } from "next/navigation"

import { MotionDiv } from "@/components/animations/MotionDiv"
import Evaluation from "@/components/courses/Evaluation"
import Sidebar from "@/components/dashboard/sidebar/Sidebar"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function AnswersPage() {
  const params = useParams<{ id: string }>()
  return (
    <MotionDiv
      className="w-full"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
    >
      <section className="flex min-h-screen overflow-y-hidden">
        <Sidebar />
        <Evaluation />
      </section>
    </MotionDiv>
  )
}
