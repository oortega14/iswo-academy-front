import { MotionDiv } from "@/components/animations/MotionDiv"
import Sidebar from "@/components/dashboard/sidebar/Sidebar"
import InProgress from "@/components/dashboard/students/InProgress"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function StudentPage() {
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
      <InProgress />
    </MotionDiv>
  )
}
