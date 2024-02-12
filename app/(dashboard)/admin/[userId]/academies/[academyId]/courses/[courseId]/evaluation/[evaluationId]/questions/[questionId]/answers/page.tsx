"use client"

import { MotionDiv } from "@/components/animations/MotionDiv"
import Answers from "@/components/courses/Answers"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function AnswersPage() {
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
      <Answers />
    </MotionDiv>
  )
}
