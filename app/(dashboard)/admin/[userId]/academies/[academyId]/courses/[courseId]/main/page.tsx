"use client"

import { MotionDiv } from "@/components/animations/MotionDiv"
import AdminCourse from "@/components/courses/AdminCourse"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function AdminPage() {
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
      <AdminCourse />
    </MotionDiv>
  )
}
