"use client"

import { MotionDiv } from "@/components/animations/MotionDiv"
import Students from "@/components/courses/Students"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function StudentesPage() {
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
      <Students />
    </MotionDiv>
  )
}
