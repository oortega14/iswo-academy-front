"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  IconComponents,
  IconEdit,
  IconList,
  IconTrash,
  IconUser,
} from "@tabler/icons-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { cn } from "@/lib/utils"
import useGetCourses from "@/hooks/useGetCourses"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { MotionButton } from "../animations/MotionButton"
import DeleteCourseModal from "../modals/DeleteCourseModal"
import EditCourseModal from "../modals/EditCourseModal"
import ButtonTooltip from "../ui/ButtonTooltip"
import { Button, buttonVariants } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import AnswersContent from "./AnswersContent"
import NoContent from "../ui/NoContent"

const CoursesContent = () => {
  const [loading, setLoading] = useState<boolean>()
  const { academyId } = useParams<{ academyId: string }>()
  const router = useRouter()
  const params = useParams()
  const courses = useGetCourses({
    academyId,
    setLoadingCallback: setLoading,
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

  console.log(courses)

  return (
    <>
      {
        courses.length > 0 ? (
          <TooltipProvider>
        <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 lg:flex-row lg:items-center lg:space-y-0">
          <h1 className="ml-3 mt-4 whitespace-nowrap text-2xl font-semibold">
            Los cursos disponibles en tu academia son
          </h1>
        </div>
        <Table className="w-full">
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
              <TableRow key={course.id}>
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
                            : open(setEditModalOpen, course.id)
                        }}
                      >
                        <IconEdit />
                      </MotionButton>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Editar Curso</p>
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
                            : open(setDeleteModalOpen, course.id)
                        }}
                      >
                        <IconTrash />
                      </MotionButton>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Eliminar Curso</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/admin/${params.id}/academies/${params.academyId}/courses/${course.id}/main`}>
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
                      <p>Administrar Curso</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell className="font-medium">
                  {course.description}
                </TableCell>
                <TableCell className="font-medium flex gap-x-2 ml-5">
                  <IconUser />
                  {course.students}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <EditCourseModal
          modalOpen={editModalOpen}
          close={() => close(setEditModalOpen)}
          courseId={courseSelectedId}
        />
        <DeleteCourseModal
          modalOpen={deleteModalOpen}
          close={() => close(setDeleteModalOpen)}
          courseId={courseSelectedId}
        />
      </TooltipProvider>
        ) : (
          <NoContent/>
        )
      }

    </>
  )
}
export default CoursesContent
