import { MotionDiv } from "@/components/animations/MotionDiv"
import DashboardContent from "@/components/dashboard/content/DashboardContent"
import Sidebar from "@/components/dashboard/sidebar/Sidebar"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function TeacherDashboard() {
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
        <DashboardContent />
      </section>
    </MotionDiv>
  )
}
