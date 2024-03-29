import { MotionDiv } from "@/components/animations/MotionDiv"
import DashboardContent from "@/components/dashboard/content/DashboardContent"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function DashboardMainPage() {
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
      <DashboardContent />
    </MotionDiv>
  )
}
