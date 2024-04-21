import { MotionDiv } from "@/components/animations/MotionDiv"
import Help from "@/components/dashboard/Help"
import { HeaderDashboard } from "@/components/dashboard/content/HeaderDashboard"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function HelpPage() {
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
      <HeaderDashboard />
      <Help />
    </MotionDiv>
  )
}
