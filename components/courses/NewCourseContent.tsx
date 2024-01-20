"use client"

import React, { FormEvent, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import { IconDeviceImacCog, IconList, IconPhotoScan } from "@tabler/icons-react"
import axios from "axios"
import { Toaster, toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

import { Button, buttonVariants } from "../ui/button"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"

const NewCoursesContent = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const { userId, academyId } = useParams<{
    userId: string
    academyId: string
  }>()
  const router = useRouter()
  const [banner, setBanner] = useState({})
  const [video, setVideo] = useState({})
  const [previewImage, setPreviewImage] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)

  const [data, setData] = useState({
    title: "",
    subtitle: "",
    price: "",
    description: "",
    academy_id: academyId,
    teacher_id: "",
    banner: null,
    promotional_video: null,
  })

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault()
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const close = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setModalOpenFunction(false)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (file) {
      setBanner(file)
      let fileReader: FileReader | null
      let isCancel = false

      fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target as FileReader
        if (result && !isCancel) {
          setPreviewImage(result.toString())
        }
      }
      fileReader.readAsDataURL(file)

      return () => {
        isCancel = true
        if (fileReader && fileReader.readyState === 1) {
          fileReader.abort()
        }
      }
    }
  }

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!!file) {
      setVideo(file)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const fd = new FormData()
    if (banner instanceof Blob) {
      fd.append("course[banner]", banner)
    }
    if (video instanceof Blob) {
      fd.append("course[promotional_video]", video)
    }
    fd.append("course[teacher_id]", data.teacher_id)
    fd.append("course[academy_id]", academyId)
    fd.append("course[description]", data.description)
    fd.append("course[price]", data.price)
    fd.append("course[subtitle]", data.subtitle)
    fd.append("course[title]", data.title)

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
        //toast.error(response)
      }
    } catch (e) {}
  }

  const handleSelect = (e: any) => {
    console.log(e)
  }

  return (
    <>
      <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 lg:flex-row lg:items-center lg:space-y-0">
        <h1 className="ml-3 mt-4 whitespace-nowrap text-2xl font-semibold">
          Los cursos disponibles en tu academia son
        </h1>
      </div>
      <form
        className="flex w-full flex-col px-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconList className="mr-2 size-5" />
          <label htmlFor="title">Titulo del curso</label>
        </div>
        <Input
          type="text"
          placeholder="Escribe aqui el titulo de tu curso"
          name="title"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconList className="mr-2 size-5" />
          <label htmlFor="subtitle">Subtitulo del curso</label>
        </div>
        <Input
          type="text"
          placeholder="Escribe aqui un subtitulo para tu curso"
          name="subtitle"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconList className="mr-2 size-5" />
          <label htmlFor="price">Precio del curso</label>
        </div>
        <Input
          type="number"
          name="price"
          onChange={(e) => handleChange(e)}
          placeholder="Escribe aqui el precio de tu curso"
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconList className="mr-2 size-5" />
          <label htmlFor="description">Descripción del curso</label>
        </div>
        <Textarea
          name="description"
          onChange={(e) => handleChange(e)}
          placeholder="Escribe aqui la descripción de tu curso"
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconPhotoScan className="mr-2 size-5" />
          <label htmlFor="banner">Banner del curso</label>
        </div>
        {!!previewImage && (
          <div className="flex justify-start items-center rounded-xl overflow-hidden my-4 max-w-[220px]">
            <div>
              <img
                src={previewImage}
                alt="vista-previa-imagen"
                className="object-cover"
              />
            </div>
          </div>
        )}
        <Input
          type="file"
          id="banner"
          onChange={(e) => handleFile(e)}
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconDeviceImacCog className="mr-2 size-5" />
          <label htmlFor="promotional_video">Video promocional del curso</label>
        </div>
        <Input
          type="file"
          id="promotional_video"
          onChange={(e) => handleVideo(e)}
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconList className="mr-2 size-5" />
          <label htmlFor="password_confirmation">Escoje el instructor</label>
        </div>
        <Select onValueChange={(e) => handleSelect(e)}>
          <SelectTrigger className="mt-2 w-full">
            <SelectValue placeholder="Escoge al instructor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Estudiante</SelectItem>
            <SelectItem value="teacher">Profesor</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
          </SelectContent>
        </Select>
        <Dialog>
          <DialogTrigger className="bg-white text-blue-dark p-2 w-full rounded-md my-4 font-bold">
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
                    <Button onClick={handleSubmit} className="mt-4 font-bold"> Seguro </Button>
                  </DialogDescription>
                </>
              ) : (
                <>
                  <DialogTitle className="text-2xl">Progreso de carga</DialogTitle>
                  <DialogDescription >
                    <Progress className="mt-2" value={uploadProgress} />
                  </DialogDescription>
                </>
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </form>
      <Toaster />
    </>
  )
}
export default NewCoursesContent
