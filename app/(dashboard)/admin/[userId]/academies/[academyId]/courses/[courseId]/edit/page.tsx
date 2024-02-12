"use client"

import { MotionDiv } from "@/components/animations/MotionDiv"
import EditCourse from "@/components/courses/EditCourse"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function EditCoursePage() {
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
      <EditCourse />
    </MotionDiv>
  )
}
