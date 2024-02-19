import { MotionDiv } from "@/components/animations/MotionDiv"
import { HeaderDashboard } from "@/components/dashboard/content/HeaderDashboard"
import VideoPlayerContent from "@/components/video_player/VideoPlayerContent"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function VideoPlayerPage() {
  return (
    <MotionDiv
      className="w-full"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        ease: "easeInOut",
        duration: 1,
      }}
      viewport={{ amount: 0 }}
    >
      <HeaderDashboard />
      <VideoPlayerContent />
    </MotionDiv>
  )
}
