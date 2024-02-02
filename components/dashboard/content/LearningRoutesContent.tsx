"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  IconCalendarMonth,
  IconEdit,
  IconList,
  IconTrash,
} from "@tabler/icons-react"

import { LearningRoute } from "@/types/sidebar"
import { cn } from "@/lib/utils"
import useGetLearningRoutes from "@/hooks/useGetLearningRoutes"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import MotionButton from "@/components/animations/MotionButton"

import { Button, buttonVariants } from "../../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table"
import LearningRouteModal from "./learningRoutes/LearningRouteModal"

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

  const close = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setModalOpenFunction(false)
  }

  const open = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>,
    learningRouteId: number
  ) => {
    setModalOpenFunction(true)
    setLearningRouteId(learningRouteId)
  }

  return (
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
                  <Button
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
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {learningRoutes.map((LearningRoute: LearningRoute) => (
                <TableRow key={LearningRoute.id}>
                  <TableCell className="flex gap-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
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
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar Ruta</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
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
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Eliminar Ruta</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={`/admin/${params.id}/academies/${params.academyId}/courses/${LearningRoute.id}/main`}
                        >
                          <Button
                            className={cn(
                              buttonVariants({ variant: "ghost" }),
                              "border-[1px] px-2"
                            )}
                          >
                            <IconList />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Administrar Ruta</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="font-medium">
                    {LearningRoute.name}
                  </TableCell>
                  <TableCell className="font-medium">
                    {LearningRoute.id}
                  </TableCell>
                  <TableCell className="ml-5 flex gap-x-2 font-medium">
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
