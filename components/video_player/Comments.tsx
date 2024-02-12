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
      <h3 className="ml-3 text-xl mb-1">{comments.total} Comentarios</h3>
      {comments?.comments?.map((comment) => (
        <div
          className="w-full flex justify-start items-center px-3 py-2"
          key={comment.id}
        >
          <div className="flex item-center items-center p-4 space-x-3 bg-slate-200 dark:bg-slate-900 w-full rounded-lg">
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
