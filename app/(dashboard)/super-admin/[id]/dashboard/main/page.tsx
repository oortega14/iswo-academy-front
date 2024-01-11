import { MotionDiv } from "@/components/animations/MotionDiv"
import DashboardContent from "@/components/dashboard/content/DashboardContent"
import Sidebar from "@/components/dashboard/sidebar/Sidebar"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function SuperAdminDashboard() {
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
          <DashboardContent />
        </div>
      </section>
    </MotionDiv>
  )
}
