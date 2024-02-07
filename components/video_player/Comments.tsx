import React from "react"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Comments = ({ lesson }: any) => {
  console.log(lesson)
  return (
    <div>
      <div className="w-full flex justify-evenly items-center bg-slate-900 h-20">
        <div className="w-1/2 flex item-center items-center h-20 p-4 space-x-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{lesson.title}</span>
        </div>
        <div className="space-x-2">
          <button
            className="h-10 bg-slate-200 border-slate-500 hover:bg-slate-300 hover:border-slate-400 dark:bg-slate-800 dark:border-slate-800 rounded-l-lg px-2  dark:hover:bg-slate-950 dark:hover:border-slate-950"
            //onClick={() => handlePrevVideo(lessonSelected.id)}
          >
            <IconArrowLeft />
          </button>
          <button
            className="h-10 bg-slate-200 border-slate-500 hover:bg-slate-300 hover:border-slate-400 dark:bg-slate-800 dark:border-slate-800 rounded-r-lg px-2  dark:hover:bg-slate-950 dark:hover:border-slate-950"
            //onClick={() => handleNextVideo(lessonSelected.id)}
          >
            <IconArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Comments
