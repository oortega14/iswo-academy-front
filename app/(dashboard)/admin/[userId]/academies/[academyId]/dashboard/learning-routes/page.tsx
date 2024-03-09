import { MotionDiv } from "@/components/animations/MotionDiv"
import DashboardLearningRoutes from "@/components/dashboard/content/DashboardLearningRoutes"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function LearningRoutesPage() {
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
      <DashboardLearningRoutes/>
    </MotionDiv>
  )
}
