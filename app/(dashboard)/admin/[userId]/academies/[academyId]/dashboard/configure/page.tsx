import { MotionDiv } from "@/components/animations/MotionDiv"
import ConfigureMain from "@/components/dashboard/admin/ConfigureMain"
import DashboardContent from "@/components/dashboard/content/DashboardContent"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function DashboardConfigurePage() {
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
      <ConfigureMain />
    </MotionDiv>
  )
}
