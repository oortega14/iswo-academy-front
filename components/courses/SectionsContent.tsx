"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import useGetCourseSections from "@/hooks/useGetCourseSections"
import MotionButton from "../animations/MotionButton"
import CreateSectionsModal from "../modals/CreateSectionsModal"
import DeleteSectionsModal from "../modals/DeleteSectionsModal"
import EditSectionsModal from "../modals/EditSectionsModal"
import { Button } from "../ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import SectionLessons from "./SectionLessons"

const SectionsContent = () => {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>()
  const [changeFlag, setChangeFlag] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [sectionsModalOpen, setSectionsModalOpen] = useState(false)
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

  const courseSections = useGetCourseSections({
    courseId: Array.isArray(params.courseId)
      ? params.courseId[0]
      : params.courseId,
    setLoadingCallback: setLoading,
    flag: changeFlag,
  })

  const sortedSections = courseSections
    .slice()
    .sort((a, b) => a.position - b.position)

  const handleNavigate = (e: any) => {
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
          <div className="flex w-full items-center justify-end space-x-4">
            <MotionButton
              className="whitespace-nowrap"
              onClick={()=>{ router.push(`/admin/${params.userId}/academies/${params.academyId}/courses/${params.courseId}/sections/new-lesson`)}}
            >
              Agregar Clase
            </MotionButton>
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
        <div className="flex w-full items-center justify-center border-b">
          <span className="w-1/5 p-3 font-bold">Acciones</span>
          <span className="w-4/5 p-3 font-bold">Nombre de la sección</span>
        </div>
        {sortedSections.map((section) => {
          return (
            <div
              key={section.id}
              className="flex w-full flex-col items-center border-b"
            >
              <div className="flex w-full bg-slate-200 dark:bg-slate-900">
                <div className="w-1/5 space-x-3 p-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="max-h-10 max-w-10 border-[1px] border-slate-400 px-2 py-1 dark:border-slate-600"
                        onClick={() =>
                          editModalOpen
                            ? close(setEditModalOpen)
                            : open(setEditModalOpen, section.id)
                        }
                      >
                        <IconEdit className=" size-6 " />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Editar Sección</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="max-h-10 max-w-10 border-[1px] border-red-600 px-2 py-1"
                        variant="ghost"
                        onClick={(e) =>
                          deleteModalOpen
                            ? close(setDeleteModalOpen)
                            : open(setDeleteModalOpen, section.id)
                        }
                      >
                        <IconTrash className=" size-6 text-red-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Eliminar Sección</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="ml-10 flex w-4/5 items-center p-3">
                  <span className="font-bold">{section.name}</span>
                </div>
              </div>
              <SectionLessons
                sectionId={section.id}
                lessons={section.lessons}
                flag={changeFlag}
                setFlag={setChangeFlag}
              />
            </div>
          )
        })}
      </TooltipProvider>
      <CreateSectionsModal
        modalOpen={sectionsModalOpen}
        close={() => close(setSectionsModalOpen)}
        flag={changeFlag}
        setFlag={setChangeFlag}
      />
      <EditSectionsModal
        modalOpen={editModalOpen}
        close={() => close(setEditModalOpen)}
        sectionId={selectedSectionId}
        flag={changeFlag}
        setFlag={setChangeFlag}
      />
      <DeleteSectionsModal
        modalOpen={deleteModalOpen}
        close={() => close(setDeleteModalOpen)}
        sectionId={selectedSectionId}
        deleteFlag={changeFlag}
        setDeleteFlag={setChangeFlag}
      />
    </>
  )
}
export default SectionsContent
