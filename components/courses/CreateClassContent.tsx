"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  IconArticle,
  IconEdit,
  IconEyeCheck,
  IconEyeX,
  IconTrash,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import useGetLessons from "@/hooks/useGetLessons"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { MotionButton } from "../animations/MotionButton"
import DeleteLessonsModal from "../modals/DeleteLessonsModal"
import EditLessonsModal from "../modals/EditLessonsModal"
import { Button, buttonVariants } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

const CreateClassContent = () => {
  const params = useParams()
  const [loading, setLoading] = useState<boolean>()
  const [editModalOpen, setEditModalOpen] = useState(false)
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
  const lessons = useGetLessons({
    courseId: Array.isArray(params.courseId)
      ? params.courseId[0]
      : params.courseId,
    setLoadingCallback: setLoading,
  })

  function truncarTexto(texto: string, longitudMaxima: number) {
    if (texto.length > longitudMaxima) {
      return texto.slice(0, longitudMaxima) + "..."
    } else {
      return texto
    }
  }

  const handleSubmit = (e) => {}

  const handleChange = (e) => {}

  return (
    <>
      <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row px-3">
        <h1 className="text-2xl font-semibold whitespace-nowrap mt-4 ml-3">
          Crea una nueva clase
        </h1>
      </div>
      <form
        className="flex flex-col p-0 w-full px-3"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconArticle className="size-5 mr-2" />
          <label htmlFor="title">Ingresa el titulo de la clase</label>
        </div>
        <Input
          type="text"
          placeholder="Escribe aqui el titulo de la clase"
          name="title"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconArticle className="size-5 mr-2" />
          <label htmlFor="description">
            Agrega una descripción de tu clase
          </label>
        </div>
        <Textarea
          name="description"
          onChange={(e) => handleChange(e)}
          placeholder="Escribe aqui tu eslogan"
          className="mt-2"
        />
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconArticle className="size-5 mr-2" />
          <label htmlFor="description">Carga el video de la clase</label>
        </div>
        <Input
          type="file"
          name="description"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconArticle className="size-5 mr-2" />
          <label htmlFor="description">Agrega los archivos que consideres necesarios</label>
        </div>
        <Input
          type="file"
          name="description"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <MotionButton whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.15 }}>
          <Button className="mt-3">Crear clase</Button>
        </MotionButton>
      </form>

      <EditLessonsModal
        modalOpen={editModalOpen}
        close={() => close(setEditModalOpen)}
        lessonId={selectedLessonId}
      />
      <DeleteLessonsModal
        modalOpen={deleteModalOpen}
        close={() => close(setDeleteModalOpen)}
        lessonId={selectedLessonId}
      />
    </>
  )
}
export default CreateClassContent
