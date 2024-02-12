import React from "react"
import {
  IconAlignBoxBottomLeft,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

const VideoInfo = ({ lessons, selectedLesson }: any) => {
  const router = useRouter()
  const { sectionId, lessonId } = useParams<{
    sectionId: string,
    lessonId: string
  }>()

  const currentLessonIndex = lessons.findIndex(
    (lesson: any) => lesson.id === Number(lessonId)
  );

  const handlePrevVideo = () => {
    const prevLessonIndex = currentLessonIndex - 1
    if (prevLessonIndex >= 0) {
      const prevLesson = lessons[prevLessonIndex]
      router.push(`/courses/1/video-player/sections/${sectionId}/lessons/${prevLesson.id}`)
    } else {
      toast.error('No hay lección anterior disponible.')
    }
  };

  const handleNextVideo = () => {
    const nextLessonIndex = currentLessonIndex + 1
    if (nextLessonIndex < lessons.length) {
      const nextLesson = lessons[nextLessonIndex]
      router.push(`/courses/1/video-player/sections/${sectionId}/lessons/${nextLesson.id}`)
    } else {
      toast.error('No hay siguiente lección disponible.')
    }
  };

  return (
    <div>
      <TooltipProvider>
        <div className="w-full flex justify-evenly items-center bg-slate-200 dark:bg-slate-900 h-20">
          <div className="w-1/2 flex item-center items-center h-20 p-4 space-x-3">
            <IconAlignBoxBottomLeft className="size-12" />
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
                  className="h-10 bg-slate-300 border-slate-500 hover:bg-slate-400 hover:border-slate-400 dark:bg-slate-800 dark:border-slate-800 rounded-l-lg px-2  dark:hover:bg-slate-950 dark:hover:border-slate-950"
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
                  className="h-10 bg-slate-300 border-slate-500 hover:bg-slate-400 hover:border-slate-400 dark:bg-slate-800 dark:border-slate-800 rounded-r-lg px-2  dark:hover:bg-slate-950 dark:hover:border-slate-950"
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
