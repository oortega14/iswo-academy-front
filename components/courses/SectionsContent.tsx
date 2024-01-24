"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  IconEdit,
  IconEyeCheck,
  IconEyeX,
  IconTrash,
} from "@tabler/icons-react"
import { Reorder, useDragControls, useMotionValue } from "framer-motion"

import { cn, truncarTexto } from "@/lib/utils"
import useGetCourseSections from "@/hooks/useGetCourseSections"
import useGetLessons from "@/hooks/useGetLessons"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import MotionButton from "../animations/MotionButton"
import CreateSectionsModal from "../modals/CreateSectionsModal"
import DeleteLessonsModal from "../modals/DeleteLessonsModal"
import { ReorderIcon } from "../modals/ReorderIcon"
import { Button, buttonVariants } from "../ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"]

const SectionsContent = () => {
  const params = useParams()
  const [loading, setLoading] = useState<boolean>()
  const [createFlag, setCreateFlag] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [sectionsModalOpen, setSectionsModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedLessonId, setSelectedLessonId] = useState(0)

  const close = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setModalOpenFunction(false)
  }
  const open = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>,
    lessonId: number
  ) => {
    setModalOpenFunction(true)
    setSelectedLessonId(lessonId)
  }
  // const lessons = useGetLessons({
  //   courseId: Array.isArray(params.courseId)
  //     ? params.courseId[0]
  //     : params.courseId,
  //   setLoadingCallback: setLoading,
  // })

  const courseSections = useGetCourseSections({
    courseId: Array.isArray(params.courseId)
      ? params.courseId[0]
      : params.courseId,
    setLoadingCallback: setLoading,
    flag: createFlag,
  })

  const [values, setValues] = useState([])

  useEffect(() => {
    if (!!courseSections) {
      setValues([...courseSections])
    }
  }, [courseSections])

  console.log(courseSections)
  console.log(values)

  const handleNavigate = (e: any) => {
    console.log(e.currentTarget.id)
  }
  return (
    <>
      <TooltipProvider>
        <div className="flex flex-col items-start justify-between space-y-4 border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
          <h1 className="ml-3 mt-4 whitespace-nowrap text-2xl font-semibold">
            Creemos tus secciones y lecciones
          </h1>
        </div>
        <div className="flex flex-col items-start justify-between space-y-4 border-b py-2 pr-4 lg:flex-row lg:items-center lg:space-y-0">
          <div className="w-full flex justify-end space-x-4 items-center">
            <MotionButton
              className="bg-green-600 hover:bg-green-500"
              onClick={() => {
                setSectionsModalOpen(!sectionsModalOpen)
              }}
            >
              Nueva Sección
            </MotionButton>
          </div>
        </div>
        <div className="w-full flex items-center justify-center border-b">
          <span className="w-1/5 p-3">Acciones</span>
          <span className="w-4/5 p-3">Nombre de la sección</span>
        </div>
        <Reorder.Group values={values} onReorder={setValues}>
          {values.map((section) => {
            return (
              <Reorder.Item key={section} value={section}>
                <div className="w-full flex flex-col items-center border-b">
                  <div className="flex w-full bg-slate-900">
                    <div className="w-1/5 p-3 space-x-3">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button className="max-w-8 max-h-8 p-1">
                            <IconEdit className=" size-6 " />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Editar Lección</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className="max-w-10 max-h-10 py-1 px-2 border-[1px]"
                            variant="ghost"
                            onClick={() =>
                              deleteModalOpen
                                ? close(setDeleteModalOpen)
                                : open(setDeleteModalOpen, section.id)
                            }
                          >
                            <IconTrash className=" size-6 " />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Eliminar Lección</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="w-4/5 p-3 ml-10 flex items-center">
                      <span>{section.name}</span>
                    </div>
                    <div className="py-3 px-4">
                      <MotionButton className="whitespace-nowrap">
                        Agregar Clase
                      </MotionButton>
                    </div>
                  </div>
                  {section.lessons.map((lesson) => (
                    <div className="w-full p-3">
                      <span className="w-full p-3">{lesson.title}</span>
                    </div>
                  ))}
                </div>
              </Reorder.Item>
            )
          })}
        </Reorder.Group>
      </TooltipProvider>
      <CreateSectionsModal
        modalOpen={sectionsModalOpen}
        close={() => close(setSectionsModalOpen)}
        flag={createFlag}
        setFlag={setCreateFlag}
      />
      <DeleteLessonsModal
        modalOpen={deleteModalOpen}
        close={() => close(setDeleteModalOpen)}
        lessonId={selectedLessonId}
      />
    </>
  )
}
export default SectionsContent
