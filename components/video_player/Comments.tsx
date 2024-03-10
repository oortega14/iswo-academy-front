import React, { useState } from "react"
import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"

import useGetComments from "@/hooks/useGetComments"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

const Comments = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const { lessonId } = useParams<{ lessonId: string }>()
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState({ comment: "" })
  const [newCommentFlag, setNewCommentFlag] = useState(false)
  const comments = useGetComments({
    lessonId: lessonId,
    setLoadingCallback: setLoading,
    flag: newCommentFlag
  })
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading
  })

  const handleCreateComment = async (e) => {
    const { name, value } = e.target
    setComment({ ...comment, [name]: value })
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    try {
      const request = await fetch(`${baseUrl}/lesson_comments`, {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        credentials: "include",
        body: JSON.stringify({
          lesson_comment: {
            comment: comment.comment,
            user_id: currentUser?.id,
            lesson_id: lessonId,
          },
        }),
      })
      const response = await request.json()
      if (request.status == 200) {
        setNewCommentFlag(!newCommentFlag)
      } else {
      }
      return response
    } catch (e) {
      console.log("error", e)
    }
  }

  return (
    <div>
      <h3 className="mb-1 ml-3 text-xl">{comments.total} Comentarios</h3>
      <form className="mt-2 flex space-x-3 px-3" onSubmit={handleSubmitComment}>
        <Avatar>
          <AvatarImage
            src={currentUser?.profile_picture || ""}
            alt="profile_picture"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Input
          name="comment"
          placeholder="Escribe aqui un comentario...."
          onChange={(e) => handleCreateComment(e)}
        />
        <Button>Comentar</Button>
      </form>
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
