import React from "react"

import { HeaderDashboard } from "@/components/dashboard/content/HeaderDashboard"
import VideoPlayerContent from "@/components/video_player/VideoPlayerContent"

export default function VideoPlayerPage() {
  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <HeaderDashboard />
      <VideoPlayerContent/>
    </div>
  )
}
