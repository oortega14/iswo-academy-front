import { MotionDiv } from "@/components/animations/MotionDiv"
import Header from "@/components/evaluation/Header"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function EvaluationLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="relative top-20 overflow-hidden">{children}</main>
    </div>
    </MotionDiv>
  )
}
