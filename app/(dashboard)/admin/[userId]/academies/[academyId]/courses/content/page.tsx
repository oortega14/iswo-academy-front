"use client"
import { MotionDiv } from "@/components/animations/MotionDiv"
import Courses from "@/components/courses/Courses"
import Sidebar from "@/components/dashboard/sidebar/Sidebar"
import { useParams } from "next/navigation"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function CoursesContentPage() {
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
          <Courses />
        </div>
      </section>
    </MotionDiv>
  )
}
