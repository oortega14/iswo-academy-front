import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import { IconEdit, IconListTree, IconTrash, IconX } from "@tabler/icons-react"
import { Reorder, useDragControls } from "framer-motion"
import { toast } from "sonner"

import DeleteLessonsModal from "../modals/DeleteLessonsModal"
import DeleteSectionsModal from "../modals/DeleteSectionsModal"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface Lesson {
  id: string
  title: string
  position: number
  // Agrega otras propiedades según sea necesario
}

const SectionLessons = ({ lessons, flag, setFlag, sectionId }: any) => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const [sortedLessons, setSortedLessons] = useState<Lesson[]>([])
  const [isPressed, setIsPressed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const params = useParams()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedSectionId, setSelectedSectionId] = useState(0)

  const close = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setModalOpenFunction(false)
  }

  const open = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>,
    sectionId: number
  ) => {
    setModalOpenFunction(true)
    setSelectedSectionId(sectionId)
  }

  const handleMouseDown = () => {
    setIsPressed(true)
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  useEffect(() => {
    if (isMounted && !isPressed) {
      sendUpdatedLessonsToBackend(sortedLessons)
    }
  }, [isPressed])

  useEffect(() => {
    setSortedLessons(
      lessons.slice().sort((a: any, b: any) => a.position - b.position)
    )
  }, [lessons])

  const handleReorder = (newOrder: Lesson[]) => {
    setSortedLessons(newOrder)
    setSortedLessons((prevSortedLessons) => {
      let updatedLessons = [...prevSortedLessons]
      newOrder.forEach((item, index) => {
        updatedLessons[index].position = index + 1
      })
      return updatedLessons
    })
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const sendUpdatedLessonsToBackend = async (sortedLessons: Lesson[]) => {
    try {
      const request = await fetch(`${baseUrl}/lessons/update_position`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sorted_lessons: sortedLessons.map(({ id, position }) => ({
            id,
            position,
          })),
        }),
        credentials: "include",
      })

      const response = await request.json()
      if (request.ok) {
        toast.success("Lecciones actualizadas correctamente")
      } else {
        console.error("Error al enviar datos al backend")
      }
    } catch (error) {
      console.error("Error en la petición al backend:", error)
    }
  }

  return (
    <div className="w-full">
      <Reorder.Group
        axis="y"
        onReorder={handleReorder}
        values={sortedLessons}
        className="flex w-full flex-col gap-2 p-3"
      >
        {sortedLessons?.map((item) => (
          <Reorder.Item
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            value={item}
            id={item.title}
            key={item.id}
            className="cursor-grab rounded-lg bg-slate-100 p-2 dark:bg-slate-800"
          >
            <div className="flex w-full items-center space-x-3 p-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/admin/${params.userId}/academies/${params.academyId}/courses/${params.courseId}/sections/${sectionId}/lessons/${item.id}/edit`}
                  >
                    <Button
                      variant={"ghost"}
                      className="max-h-10 max-w-10 border-[1px] border-slate-400 px-2 py-1 dark:border-slate-600"
                    >
                      <IconEdit className=" size-6 " />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Editar Lección</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="max-h-10 max-w-10 border-[1px] border-red-600 px-2 py-1"
                    variant="ghost"
                    onClick={() =>
                      deleteModalOpen
                        ? close(setDeleteModalOpen)
                        : open(setDeleteModalOpen, JSON.parse(item.id))
                    }
                  >
                    <IconX className=" size-6 text-red-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Eliminar Lección</p>
                </TooltipContent>
              </Tooltip>
              <span className="w-full">{item.title}</span>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <DeleteLessonsModal
        modalOpen={deleteModalOpen}
        close={() => close(setDeleteModalOpen)}
        lessonId={selectedSectionId}
        flag={flag}
        setFlag={setFlag}
      />
    </div>
  )
}

export default SectionLessons
