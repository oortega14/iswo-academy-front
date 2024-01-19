"use client"

import { useParams } from "next/navigation"

import { MotionDiv } from "@/components/animations/MotionDiv"
import Sidebar from "@/components/dashboard/sidebar/Sidebar"
import Lessons from "@/components/courses/Lessons"

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
      <section>
        <div className="flex min-h-screen overflow-y-hidden ">
          <Sidebar />
          <Lessons/>
        </div>
      </section>
    </MotionDiv>
  )
}
