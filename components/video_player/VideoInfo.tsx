import React from "react"
import { useParams, useRouter } from "next/navigation"
import {
  IconAlignBoxBottomLeft,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react"
import { toast } from "sonner"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const VideoInfo = ({ lessons, selectedLesson }: any) => {
  const router = useRouter()
  const { sectionId, lessonId, courseId } = useParams<{
    courseId: string
    sectionId: string
    lessonId: string
  }>()

  const currentLessonIndex = lessons.findIndex(
    (lesson: any) => lesson.id === Number(lessonId)
  )

  const handlePrevVideo = () => {
    const prevLessonIndex = currentLessonIndex - 1
    if (prevLessonIndex >= 0) {
      const prevLesson = lessons[prevLessonIndex]
      router.push(
        `/courses/${courseId}/video-player/sections/${sectionId}/lessons/${prevLesson.id}`
      )
    } else {
      toast.error("No hay lección anterior disponible.")
    }
  }

  const handleNextVideo = () => {
    const nextLessonIndex = currentLessonIndex + 1
    if (nextLessonIndex < lessons.length) {
      const nextLesson = lessons[nextLessonIndex]
      router.push(
        `/courses/${courseId}/video-player/sections/${sectionId}/lessons/${nextLesson.id}`
      )
    } else {
      toast.error("No hay siguiente lección disponible.")
    }
  }

  return (
    <div>
      <TooltipProvider>
        <div className="flex min-h-20 w-full items-center justify-evenly bg-slate-200 dark:bg-slate-900">
          <div className="flex min-h-20 w-1/2 items-center space-x-3 p-4">
            <div className="flex h-full items-start">
              <IconAlignBoxBottomLeft className="size-12" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl">{selectedLesson.title}</span>
              <span className="text-muted-foreground">
                {selectedLesson.description}
              </span>
            </div>
          </div>
          <div className="space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="h-10 rounded-l-lg border-slate-500 bg-slate-300 px-2 hover:border-slate-400 hover:bg-slate-400 dark:border-slate-800 dark:bg-slate-800  dark:hover:border-slate-950 dark:hover:bg-slate-950"
                  onClick={() => handlePrevVideo()}
                >
                  <IconArrowLeft />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Anterior clase</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="h-10 rounded-r-lg border-slate-500 bg-slate-300 px-2 hover:border-slate-400 hover:bg-slate-400 dark:border-slate-800 dark:bg-slate-800  dark:hover:border-slate-950 dark:hover:bg-slate-950"
                  onClick={() => handleNextVideo()}
                >
                  <IconArrowRight />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Siguiente clase</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    </div>
  )
}

export default VideoInfo
