"use client"

import useGetLearningRoutes from "@/hooks/useGetLearningRoutes"
import { LearningRoute } from "@/types/sidebar"
import LearningRouteModal from "./learningRoutes/LearningRouteModal"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { IconEdit, IconList, IconTrash, IconCalendarMonth } from "@tabler/icons-react"
import { MotionButton } from "../../animations/MotionButton"
import { buttonVariants } from "../../ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const LearningRoutesContent = () => {
  const [loading, setLoading] = useState<boolean>()
  const { academyId } = useParams<{ academyId: string }>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [learningRouteId, setLearningRouteId] = useState(0)
  const params = useParams()
  const learningRoutes = useGetLearningRoutes({
    academyId,
    setLoadingCallback: setLoading,
  })

  const close = ( setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>> ) => {
    setModalOpenFunction(false)
  }

  const open = ( setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>, learningRouteId: number) => {
    setModalOpenFunction(true)
    setLearningRouteId(learningRouteId)
  }

  return(
    <>
      <div>
        <TooltipProvider>
          <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/6 "></TableHead>
                  <TableHead className="w-2/6 ">Nombre</TableHead>
                  <TableHead className="w-1/6 ">Cursos</TableHead>
                  <TableHead className="w-1/6">Creado</TableHead>
                  <TableHead className="w-1/6">
                    <MotionButton
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "border-[1px] px-2"
                      )}
                      onClick={() => {
                        editModalOpen
                          ? close(setEditModalOpen)
                          : open(setEditModalOpen, 0)
                      }}
                    >
                    <p>Nueva Ruta</p>
                    </MotionButton>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              { learningRoutes.map((LearningRoute: LearningRoute) => (
                <TableRow key={LearningRoute.id}>
                  <TableCell className="flex gap-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <MotionButton
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "border-[1px] px-2"
                          )}
                          onClick={() => {
                            editModalOpen
                              ? close(setEditModalOpen)
                              : open(setEditModalOpen, LearningRoute.id)
                          }}
                        >
                          <IconEdit />
                        </MotionButton>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar Ruta</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <MotionButton
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "border-[1px] px-2"
                          )}
                          onClick={() => {
                            editModalOpen
                              ? close(setDeleteModalOpen)
                              : open(setDeleteModalOpen, LearningRoute.id)
                          }}
                        >
                          <IconTrash />
                        </MotionButton>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Eliminar Ruta</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/admin/${params.id}/academies/${params.academyId}/courses/${LearningRoute.id}/main`}>
                        <MotionButton
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "border-[1px] px-2"
                          )}
                        >
                          <IconList />
                        </MotionButton>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Administrar Ruta</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="font-medium">{LearningRoute.name}</TableCell>
                  <TableCell className="font-medium">
                    {LearningRoute.id}
                  </TableCell>
                  <TableCell className="font-medium flex gap-x-2 ml-5">
                    <IconCalendarMonth />
                    {LearningRoute.created_at}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
        <LearningRouteModal
          modalOpen={editModalOpen}
          close={() => close(setEditModalOpen)}
          learningRouteId={learningRouteId}
          academyId={academyId}
        />
      </div>
    </>
  )
}

export default LearningRoutesContent