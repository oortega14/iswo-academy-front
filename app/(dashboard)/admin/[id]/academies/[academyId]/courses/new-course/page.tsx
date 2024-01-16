"use client"
import { MotionDiv } from "@/components/animations/MotionDiv"
import NewCourse from "@/components/courses/NewCourse"
import Sidebar from "@/components/dashboard/sidebar/Sidebar"
import { useParams } from "next/navigation"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function NewCoursePage() {
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
      <section>
        <div className="flex min-h-screen overflow-y-hidden ">
          <Sidebar />
          <NewCourse />
        </div>
      </section>
    </MotionDiv>
  )
}
