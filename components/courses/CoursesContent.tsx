"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { IconEdit, IconList, IconTrash, IconUser } from "@tabler/icons-react"

import { cn, truncarTexto } from "@/lib/utils"
import useGetCourses from "@/hooks/useGetCourses"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import DeleteCourseModal from "../modals/DeleteCourseModal"
import LoadingModal from "../modals/LoadingModal"
import NoContent from "../ui/NoContent"
import { Button, buttonVariants } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import MotionButton from "../animations/MotionButton"

const CoursesContent = () => {
  const [loading, setLoading] = useState<boolean>()
  const { academyId, userId } = useParams<{ userId: string, academyId: string }>()
  const [deleteFlag, setDeleteFlag] = useState(false)
  const router = useRouter()
  const params = useParams()
  const courses = useGetCourses({
    academyId,
    setLoadingCallback: setLoading,
    flag: deleteFlag,
  })
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [courseSelectedId, setCourseSelectedId] = useState(0)

  const close = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setModalOpenFunction(false)
  }
  const open = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>,
    courseId: number
  ) => {
    setModalOpenFunction(true)
    setCourseSelectedId(courseId)
  }

  if (loading) {
    return <LoadingModal />
  }

  return (
    <>
      {courses.length > 0 ? (
        <TooltipProvider>
          <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 lg:flex-row lg:items-center lg:space-y-0">
            <h1 className="ml-3 mt-4 whitespace-nowrap text-2xl font-semibold">
              Los cursos disponibles en tu academia son
            </h1>
          </div>
          <div className="flex w-full justify-end border-b py-2">
          <MotionButton
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "border-[1px] px-2"
            )}
            onClick={() => {
              router.push(`/admin/${userId}/academies/${academyId}/courses/new-course`)
            }}
          >
            <p>Crear un nuevo curso</p>
          </MotionButton>
        </div>
          <Table className="w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/5 ">Acciones</TableHead>
                <TableHead className="w-1/5 ">Título del curso</TableHead>
                <TableHead className="w-2/5 ">Descripción</TableHead>
                <TableHead className="w-1/6">Estudiantes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id} >
                  <TableCell className="space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className={cn("border-[1px] px-2")}
                          onClick={() => {
                            router.push(
                              `/admin/${params.userId}/academies/${params.academyId}/courses/${course.id}/edit`
                            )
                          }}
                        >
                          <IconEdit />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar Curso</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"destructive"}
                          className={cn("border-[1px] px-2")}
                          onClick={() => {
                            editModalOpen
                              ? close(setDeleteModalOpen)
                              : open(setDeleteModalOpen, course.id)
                          }}
                        >
                          <IconTrash />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Eliminar Curso</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={`/admin/${params.userId}/academies/${params.academyId}/courses/${course.id}/main`}
                        >
                          <Button
                            variant={"ghost"}
                            className={cn("border-[1px] px-2")}
                          >
                            <IconList />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Administrar Curso</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell className="font-medium">
                    {truncarTexto(course.description, 150)}
                  </TableCell>
                  <TableCell className="ml-5 font-medium">
                    <div className="flex items-center gap-x-1">
                      <IconUser className="size-7" />
                      {course.students}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DeleteCourseModal
            modalOpen={deleteModalOpen}
            close={() => close(setDeleteModalOpen)}
            courseId={courseSelectedId}
            deleteFlag={deleteFlag}
            setDeleteFlag={setDeleteFlag}
          />
        </TooltipProvider>
      ) : (
        <NoContent />
      )}
    </>
  )
}
export default CoursesContent
