"use client"

import React, { FormEvent, useEffect, useState } from "react"
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

import useGetCourseSections from "@/hooks/useGetCourseSections"
import useGetLesson from "@/hooks/useGetLesson"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

import InputFileWithImage from "../forms/InputFileWithImage"
import InputFileWithList from "../forms/InputFileWithList"
import InputFileWithVideo from "../forms/InputFileWithVideo"
import InputNumberWithIcon from "../forms/InputNumberWithIcon"
import InputTextWithIcon from "../forms/InputTextWithIcon"
import TextareaWithIcon from "../forms/TextareaWithIcon"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const EditLessonContent = () => {
  const router = useRouter()
  const baseUrl = useUIStore((state) => state.baseUrl)
  const { userId, academyId, courseId, lessonId } = useParams<{
    userId: string
    academyId: string
    courseId: string
    lessonId: string
  }>()
  const [loading, setLoading] = useState(true)
  const [flag, setFlag] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [video, setVideo] = useState({ name: "" })
  const [files, setFiles] = useState<File[]>([])
  const [courseSectionSelected, setCourseSectionSelected] = useState("")

  const [data, setData] = useState({
    title: "",
    description: "",
    visible: false,
    courseSectionId: "",
    externalVideoUrl: "",
  })

  const CourseSections = useGetCourseSections({
    flag: flag,
    courseId: courseId,
    setLoadingCallback: setLoading,
  })

  const lesson = useGetLesson({
    lessonId: JSON.parse(lessonId),
    setLoadingCallback: setLoading,
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const fd = new FormData()
    if (video instanceof Blob) {
      fd.append("lesson[video]", video)
    }
    fd.append("lesson[title]", data.title)
    fd.append("lesson[description]", data.description)
    fd.append("lesson[course_section_id]", courseSectionSelected)
    fd.append("lesson[external_video_url]", data.externalVideoUrl)
    fd.append("lesson[visible]", data.visible ? "t" : "f")
    files.forEach((element, index) => {
      fd.append(`lesson[archives_attributes][${index}][archivable_id]`, "")
      fd.append(
        `lesson[archives_attributes][${index}][archivable_type]`,
        "Lesson"
      )
      fd.append(`lesson[archives_attributes][${index}][file]`, element)
    })

    try {
      const response = await axios({
        url: `${baseUrl}/lessons/${lesson?.id}`,
        method: "PATCH",
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
        toast.success(`Clase creada`)
        router.push(
          `/admin/${userId}/academies/${academyId}/courses/${courseId}/sections/`
        )
      }
      return response
    } catch (e) {}
  }

  const handleCheck = (e: boolean) => {
    setData({ ...data, visible: e })
  }

  const handleSelect = (e: string) => {
    setCourseSectionSelected(e)
  }

  console.log(lesson)

  useEffect(() => {
    if (!!lesson) {
      setData((prevConfig) => ({
        ...prevConfig,
        title: lesson?.title,
        description: lesson?.description,
        visible: lesson?.visible,
        courseSectionId: lesson?.course_section_id,
        externalVideoUrl: !!lesson?.external_video_url
          ? lesson?.external_video_url
          : "",
      }))
    }
  }, [lesson])

  useEffect(() => {
    if (!!lesson) {
      setCourseSectionSelected(JSON.stringify(lesson.course_section_id))
    }
  }, [lesson])

  return (
    <>
      <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 lg:flex-row lg:items-center lg:space-y-0">
        <h1 className="ml-3 mt-4 whitespace-nowrap text-2xl font-semibold">
          Puedes crear una lección a continuación:
        </h1>
      </div>
      <form
        className="flex w-full flex-col px-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <InputTextWithIcon
          Icon={IconListTree}
          label={"Titulo de la clase"}
          name={"title"}
          defaultValue={lesson?.title}
          placeholder={"Escribe aqui el titulo de tu clase"}
          onChange={(e) => handleChange(e)}
        />
        <TextareaWithIcon
          Icon={IconFileDescription}
          label={"Descripción de la clase"}
          name={"description"}
          placeholder={"Escribe aqui la descripción de tu clase"}
          defaultValue={lesson?.description}
          onChange={(e) => handleChange(e)}
        />
        <InputFileWithVideo
          Icon={IconDeviceImacCog}
          label={"Video de la clase"}
          name="promotional_video"
          video={video}
          setVideo={setVideo}
          defaultVideo={lesson?.url_video}
        />
        <InputTextWithIcon
          Icon={IconListTree}
          label={"O puedes poner una url externa"}
          name={"externalVideoUrl"}
          defaultValue={lesson?.external_video_url}
          placeholder={"Enlace del vídeo"}
          onChange={(e) => handleChange(e)}
        />
        <InputFileWithList
          Icon={IconListTree}
          label={"Archivos de la clase"}
          name={"files"}
          files={files}
          setFiles={setFiles}
          defaultFiles={lesson?.files}
        />

        <div className="my-3 flex w-full items-center justify-start rounded-full">
          <IconList className="mr-2 size-5" />
          <label htmlFor={"select"}>Selecciona una sección</label>
        </div>
        <Select
          onValueChange={(e) => handleSelect(e)}
          value={courseSectionSelected}
        >
          <SelectTrigger className="w-full" id="select">
            <SelectValue
              className="text-muted-foreground"
              placeholder="Seleccionar"
            />
          </SelectTrigger>
          <SelectContent>
            {CourseSections.map((section) => (
              <SelectItem key={section.id} value={JSON.stringify(section.id)}>
                {section.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="my-4 flex items-center space-x-2">
          <Checkbox
            id="visible"
            className="h-5 w-5"
            onCheckedChange={(e) => handleCheck(e as boolean)}
            checked={lesson?.visible}
          />
          <label
            htmlFor="visible"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            ¿Es visible para los estudiantes?
          </label>
        </div>

        <Dialog>
          <DialogTrigger className="dark:text-blue-dark bg-blue-dark my-4 w-full rounded-md p-2 font-bold text-slate-200 dark:bg-white">
            Editar Lección
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
    </>
  )
}

export default EditLessonContent
