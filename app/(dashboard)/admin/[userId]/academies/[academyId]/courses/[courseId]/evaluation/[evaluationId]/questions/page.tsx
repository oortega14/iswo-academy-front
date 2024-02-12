"use client"

import { MotionDiv } from "@/components/animations/MotionDiv"
import Questions from "@/components/courses/Questions"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function QuestionsPage() {
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
      <Questions />
    </MotionDiv>
  )
}
