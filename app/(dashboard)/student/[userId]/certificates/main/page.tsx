import React from "react"

import { MotionDiv } from "@/components/animations/MotionDiv"
import Certificate from "@/components/certificates/Certificate"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function CertificatesStudentsPage() {
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
      <Certificate />
    </MotionDiv>
  )
}
