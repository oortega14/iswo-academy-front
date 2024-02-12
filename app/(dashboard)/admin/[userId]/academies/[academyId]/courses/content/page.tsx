"use client"

import { MotionDiv } from "@/components/animations/MotionDiv"
import Courses from "@/components/courses/Courses"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function CoursesContentPage() {
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
      <Courses />
    </MotionDiv>
  )
}
