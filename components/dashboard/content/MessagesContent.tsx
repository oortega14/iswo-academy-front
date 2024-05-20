"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"

import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import useGetLessonComments from "@/hooks/useGetLessonComments"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import MotionButton from "@/components/animations/MotionButton"
import { toast } from "sonner"

const MessagesContent = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const { academyId } = useParams<{ academyId: string }>()
  const [loadingUser, setLoadingUser] = useState(true)
  const [loadingComments, setLoadingComments] = useState(true)
  const [changeFlag, setChangeFlag] = useState(true)

  const currentUser = useGetCurrentUser({
    setLoadingCallback: setLoadingUser,
    baseUrl: baseUrl,
  })

  const lessonComments = useGetLessonComments({
    setLoadingCallback: setLoadingComments,
    academyId: academyId,
    flag: changeFlag,
  })

  const handleSolveComment = async (comment_id: number) => {
    try {
      const request = await fetch(`${baseUrl}/lesson_comments/${comment_id}/update_status`, {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        credentials: "include",
      })
      const response = await request.json()
      if (request.status === 200) {
        toast.success('Comentario Actualizado correctamente')
        setChangeFlag(!changeFlag)
      }
      return response
    } catch (e) {}
  }


  if (loadingComments) {
    return <span></span>
  }
  return (
    <div>
      <div className="flex flex-col items-start justify-between space-y-4 border-b pb-6 lg:flex-row lg:items-center lg:space-y-0 px-5 pt-5">
        <h1 className="whitespace-nowrap text-2xl font-semibold">
          Hola {currentUser?.first_name}, a continuación podrás ver los mensajes
          y comentarios de tu academia
        </h1>
      </div>
      <div>
        <Accordion type="single" collapsible className="w-full mb-3">
          <AccordionItem value="item-1">
            <AccordionTrigger className="bg-slate-200 rounded-md px-3 dark:bg-slate-900">
              Comentarios No resueltos
            </AccordionTrigger>
            <AccordionContent className="py-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[20%]">Curso</TableHead>
                    <TableHead className="w-[20%]">Usuario</TableHead>
                    <TableHead className="w-[40%]">Comentario</TableHead>
                    <TableHead className="text-right pr-36">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lessonComments?.comments_unsolved.map((comment) => (
                    <TableRow>
                      <TableCell className="font-medium">{comment.course_title}</TableCell>
                      <TableCell>{comment.user.name}</TableCell>
                      <TableCell>{comment.comment}</TableCell>
                      <TableCell className="text-right">
                        <MotionButton
                          onClick={()=>handleSolveComment(comment.id)}
                        >
                          Marcar como resuelto
                        </MotionButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="bg-slate-200 rounded-md px-3 dark:bg-slate-900">
              Comentarios Resueltos
            </AccordionTrigger>
            <AccordionContent className="py-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">Curso</TableHead>
                    <TableHead className="w-[30%]">Usuario</TableHead>
                    <TableHead className="w-[40%]">Comentario</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lessonComments?.comments_solved.map((comment) => (
                    <TableRow>
                      <TableCell className="font-medium">{comment.course_title}</TableCell>
                      <TableCell>{comment.user.name}</TableCell>
                      <TableCell>{comment.comment}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default MessagesContent
