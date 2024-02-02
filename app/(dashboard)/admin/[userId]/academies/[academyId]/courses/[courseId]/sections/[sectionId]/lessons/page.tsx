"use client"

import Sidebar from "@/components/dashboard/sidebar/Sidebar"
import Sections from "@/components/courses/Sections"
import { MotionDiv } from '@/components/animations/MotionDiv'

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function lessonPage() {
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
      <section>
        <div className="flex min-h-screen overflow-y-hidden ">
          <Sidebar />
          <Sections/>
        </div>
      </section>
    </MotionDiv>
  )
}
