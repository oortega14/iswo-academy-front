"use client"

import React, { FormEvent, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import {
  IconDeviceImacCog,
  IconFileDescription,
  IconLayoutCollage,
  IconList,
  IconListTree,
  IconPhotoScan,
  IconReceipt2,
} from "@tabler/icons-react"
import axios from "axios"
import { Toaster, toast } from "sonner"

import useGetLearningRoutes from "@/hooks/useGetLearningRoutes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

import MotionButton from "../animations/MotionButton"
import { MotionDiv } from "../animations/MotionDiv"
import InputFileWithImage from "../forms/InputFileWithImage"
import InputFileWithVideo from "../forms/InputFileWithVideo"
import InputNumberWithIcon from "../forms/InputNumberWithIcon"
import InputTextWithIcon from "../forms/InputTextWithIcon"
import ListItemsFromInput from "../forms/ListItemsFromInput"
import TextareaWithIcon from "../forms/TextareaWithIcon"
import CreateLearningRouteModal from "../modals/CreateLearningRouteModal"
import { Button, buttonVariants } from "../ui/button"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const NewCoursesContent = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const { userId, academyId } = useParams<{
    userId: string
    academyId: string
  }>()
  const router = useRouter()
  const [banner, setBanner] = useState({})
  const [promotionalImage, setPromotionalImage] = useState({})
  const [video, setVideo] = useState({ name: "" })
  const [previewPromImage, setPreviewPromImage] = useState("")
  const [previewImage, setPreviewImage] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [changeFlag, setChangeFlag] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const [data, setData] = useState({
    title: "",
    subtitle: "",
    price: "",
    description: "",
    academy_id: academyId,
    teacher_id: userId,
    learning_route_id: "",
    banner: null,
    promotional_video: null,
    promotional_image: null,
  })

  const [dataGoals, setDataGoals] = useState([{ description: "" }])

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
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setModalOpenFunction(true)
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault()
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleSelect = (e: any) => {
    setData({ ...data, learning_route_id: e })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const fd = new FormData()
    if (banner instanceof Blob) {
      fd.append("course[banner]", banner)
    }
    if (promotionalImage instanceof Blob) {
      fd.append("course[promotional_image]", promotionalImage)
    }
    if (video instanceof Blob) {
      fd.append("course[promotional_video]", video)
    }
    fd.append("course[teacher_id]", userId)
    fd.append("course[learning_route_id]", data.learning_route_id)
    fd.append("course[academy_id]", academyId)
    fd.append("course[description]", data.description)
    fd.append("course[price]", data.price)
    fd.append("course[subtitle]", data.subtitle)
    fd.append("course[title]", data.title)
    fd.append("course[course_goals]", JSON.stringify(dataGoals))

    try {
      const response = await axios({
        url: `${baseUrl}/courses`,
        method: "POST",
        headers: { "Content-type": "multipart/form-data" },
        withCredentials: true,
        data: fd,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent?.loaded * 100) /
              (!!progressEvent.total ? progressEvent.total : 1)
          )
          setUploadProgress(percentCompleted)
        },
      })
      if (response.status === 200) {
        router.push(`/admin/${userId}/academies/${academyId}/courses/content`)
        toast.success("Curso Creado con exito")
      } else {
        toast.error("No se pudo crear el curso")
      }
    } catch (e) {}
  }

  return (
    <>
      <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 lg:flex-row lg:items-center lg:space-y-0">
        <h1 className="ml-3 mt-4 whitespace-nowrap text-2xl font-semibold">
          Puedes crear un nuevo curso a continuación:
        </h1>
      </div>
      <form
        className="flex w-full flex-col px-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <InputTextWithIcon
          Icon={IconListTree}
          label={"Titulo del curso"}
          name={"title"}
          placeholder={"Escribe aqui el titulo de tu curso"}
          onChange={(e) => handleChange(e)}
        />
        <InputTextWithIcon
          Icon={IconListTree}
          label={"Subtitulo del curso"}
          name={"subtitle"}
          placeholder={"Escribe aqui un subtitulo para tu curso"}
          onChange={(e) => handleChange(e)}
        />
        <InputNumberWithIcon
          Icon={IconReceipt2}
          label={"Precio del curso"}
          name={"price"}
          placeholder={"Escribe aqui el precio de tu curso"}
          onChange={(e) => handleChange(e)}
        />
        <TextareaWithIcon
          Icon={IconFileDescription}
          label={"Descripción del curso"}
          name={"description"}
          placeholder={"Escribe aqui la descripción de tu curso"}
          onChange={(e) => handleChange(e)}
        />
        <ListItemsFromInput
          data={dataGoals}
          setData={setDataGoals}
          Icon={IconList}
          label="Objetivos del Curso"
          placeholder="Escribe aqui el precio de tu curso"
          buttonLabel="Agregar Objetivo"
        />
        <InputFileWithImage
          Icon={IconPhotoScan}
          label={"Banner del Curso"}
          name={"banner"}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          setImage={setBanner}
        />
        <InputFileWithImage
          Icon={IconLayoutCollage}
          label={"Imagen promocional del curso"}
          name={"promotional_image"}
          previewImage={previewPromImage}
          setPreviewImage={setPreviewPromImage}
          setImage={setPromotionalImage}
        />
        <InputFileWithVideo
          Icon={IconDeviceImacCog}
          label={"Video Promocional del Curso"}
          name="promotional_video"
          video={video}
          setVideo={setVideo}
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconList className="mr-2 size-5" />
          <label htmlFor="password_confirmation">
            Escoje la ruta de aprendizaje
          </label>
        </div>
        <div className="flex items-center justify-start space-x-3">
          <Select onValueChange={(e) => handleSelect(e)}>
            <SelectTrigger className="my-2">
              <SelectValue
                className="text-muted-foreground"
                placeholder="Escoge una ruta de aprendizaje"
              />
            </SelectTrigger>
            <SelectContent>
              {learningRoutes.map((route) => (
                <SelectItem key={route.id} value={JSON.stringify(route.id)}>
                  {route.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <MotionButton
            className="whitespace-nowrap font-semibold"
            onClick={() => {
              open(setCreateModalOpen)
            }}
          >
            Crear una ruta nueva
          </MotionButton>
        </div>
        <Dialog>
          <DialogTrigger className="dark:text-blue-dark bg-blue-dark my-4 w-full rounded-md p-2 font-bold text-slate-200 dark:bg-white">
            Crear curso
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              {uploadProgress === 0 ? (
                <>
                  <DialogTitle className="text-2xl">
                    ¿Todos los datos ingresados son correctos?
                  </DialogTitle>
                  <DialogDescription className="flex justify-center">
                    <Button onClick={handleSubmit} className="mt-4 font-bold">
                      ¡Si, Seguro!{" "}
                    </Button>
                  </DialogDescription>
                </>
              ) : (
                <>
                  <DialogTitle className="text-2xl">
                    Progreso de carga
                  </DialogTitle>
                  <DialogDescription>
                    <Progress className="mt-2" value={uploadProgress} />
                  </DialogDescription>
                </>
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </form>
      <CreateLearningRouteModal
        modalOpen={createModalOpen}
        close={() => close(setCreateModalOpen)}
        academyId={academyId}
        changeFlag={changeFlag}
        setChangeFlag={setChangeFlag}
      />
    </>
  )
}
export default NewCoursesContent
