import { MotionDiv } from "@/components/animations/MotionDiv";
import DashboardContentMessages from "@/components/dashboard/content/DashboardContentMessages";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
export default function MessagesPage() {
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
      <DashboardContentMessages />
    </MotionDiv>
  )
}
