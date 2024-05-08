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
import CreateLearningRouteModal from "@/components/modals/CreateLearningRouteModal"
import DeleteLearningRouteModal from "@/components/modals/DeleteLearningRouteModal"

import { formatDate } from "../../../lib/utils"
import EditLearningRouteModal from "../../modals/EditLearningRouteModal"
import { Button, buttonVariants } from "../../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table"

const LearningRoutesContent = () => {
  const [loading, setLoading] = useState<boolean>()
  const { academyId } = useParams<{ academyId: string }>()
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [learningRouteId, setLearningRouteId] = useState(0)
  const [changeFlag, setChangeFlag] = useState(false)
  const params = useParams()
  const learningRoutes = useGetLearningRoutes({
    academyId: academyId,
    setLoadingCallback: setLoading,
    changeFlag: changeFlag,
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
        <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 lg:flex-row lg:items-center lg:space-y-0">
          <h1 className="ml-3 mt-4 whitespace-nowrap text-2xl font-semibold">
            Las rutas de aprendizaje disponibles en tu academia son
          </h1>
        </div>
        <div className="flex w-full justify-end border-b py-2">
          <MotionButton
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "border-[1px] px-2"
            )}
            onClick={() => {
              open(setCreateModalOpen, 0)
            }}
          >
            <p>Crear una nueva ruta</p>
          </MotionButton>
        </div>
        <TooltipProvider>
          <Table className="w-full text-center">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/6 "></TableHead>
                <TableHead className="w-2/6 text-center">Nombre</TableHead>
                <TableHead className="w-1/6 text-center">Cursos</TableHead>
                <TableHead className="w-2/6 text-center">Creada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {learningRoutes.map((LearningRoute: LearningRoute) => (
                <TableRow key={LearningRoute.id}>
                  <TableCell className=" space-x-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className="border-[1px] px-2"
                          onClick={() => {
                            open(setEditModalOpen, LearningRoute.id)
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
                          variant={"destructive"}
                          className="border-[1px] px-2"
                          onClick={() => {
                            open(setDeleteModalOpen, LearningRoute.id)
                          }}
                        >
                          <IconTrash />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Eliminar Ruta</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="font-medium">
                    {LearningRoute.name}
                  </TableCell>
                  <TableCell className="font-medium">
                    {LearningRoute.id}
                  </TableCell>
                  <TableCell className="ml-5 font-medium">
                    <div className="flex w-full items-center justify-center gap-x-2">
                      <IconCalendarMonth />
                      {formatDate(LearningRoute.created_at)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
        <CreateLearningRouteModal
          modalOpen={createModalOpen}
          close={() => close(setCreateModalOpen)}
          academyId={academyId}
          changeFlag={changeFlag}
          setChangeFlag={setChangeFlag}
        />
        <EditLearningRouteModal
          modalOpen={editModalOpen}
          close={() => close(setEditModalOpen)}
          learningRouteId={learningRouteId}
          academyId={academyId}
          changeFlag={changeFlag}
          setChangeFlag={setChangeFlag}
        />
        <DeleteLearningRouteModal
          modalOpen={deleteModalOpen}
          close={() => close(setDeleteModalOpen)}
          learningRouteId={learningRouteId}
          flag={changeFlag}
          setFlag={setChangeFlag}
        />
      </div>
    </>
  )
}

export default LearningRoutesContent
