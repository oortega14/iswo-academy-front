import React, { useState } from "react"
import { useParams } from "next/navigation"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"

import useGetComments from "@/hooks/useGetComments"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Comments = () => {
  const { lessonId } = useParams<{ lessonId: string }>()
  const [loading, setLoading] = useState(true)
  const comments = useGetComments({
    lessonId: lessonId,
    setLoadingCallback: setLoading,
  })
  return (
    <div>
      <h3 className="mb-1 ml-3 text-xl">{comments.total} Comentarios</h3>
      {comments?.comments?.map((comment) => (
        <div
          className="flex w-full items-center justify-start px-3 py-2"
          key={comment.id}
        >
          <div className="item-center flex w-full items-center space-x-3 rounded-lg bg-slate-200 p-4 dark:bg-slate-900">
            <Avatar>
              <AvatarImage
                src={comment.user.picture || ""}
                alt="profile_picture"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h3>@{comment.user.name}</h3>
              <p className="text-muted-foreground">{comment.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comments
