import { MotionDiv } from "@/components/animations/MotionDiv"
import SuperAdminDashboard from "@/components/dashboard/superadmin/SuperAdminDashboard"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function SuperAdminDashboardPage() {
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
      <SuperAdminDashboard />
    </MotionDiv>
  )
}
