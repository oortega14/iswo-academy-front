import { MotionDiv } from "@/components/animations/MotionDiv"
import SidebarVideoPlayer from "@/components/dashboard/sidebar/SidebarVideoPlayer"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function VideoPlayerLayout({
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
    >
      <div className="flex min-h-screen overflow-y-hidden ">
        <SidebarVideoPlayer />
        {children}
      </div>
    </MotionDiv>
  )
}
