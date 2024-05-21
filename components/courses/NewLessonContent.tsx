"use client"

import React, { FormEvent, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import {
  IconDeviceImacCog,
  IconFileDescription,
  IconList,
  IconListTree,
} from "@tabler/icons-react"
import axios from "axios"
import { toast } from "sonner"
import useGetCourseSections from "@/hooks/useGetCourseSections"
import { Checkbox } from "@/components/ui/checkbox"
import InputFileWithList from "../forms/InputFileWithList"
import InputFileWithVideo from "../forms/InputFileWithVideo"
import InputTextWithIcon from "../forms/InputTextWithIcon"
import TextareaWithIcon from "../forms/TextareaWithIcon"
import UploadProgressModal from "../modals/UploadProgressModal"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import MotionButton from "../animations/MotionButton"

const NewLessonContent = () => {
  const router = useRouter()
  const baseUrl = useUIStore((state) => state.baseUrl)
  const { userId, academyId, courseId } = useParams<{
    userId: string
    academyId: string
    courseId: string
  }>()
  const [loading, setLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState(false)
  const [error, setError] = useState(false)
  const [progressFlag, setProgressFlag] = useState(false)
  const [flag, setFlag] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [video, setVideo] = useState({ name: "" })
  const [files, setFiles] = useState<File[]>([])
  const [data, setData] = useState({
    title: "",
    description: "",
    visible: false,
    courseSectionId: "",
    externalVideoUrl: ''
  })

  const close = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setModalOpenFunction(false)
  }

  const CourseSections = useGetCourseSections({
    flag: flag,
    courseId: courseId,
    setLoadingCallback: setLoading,
    adminFlag: true,
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
    fd.append("lesson[course_section_id]", data.courseSectionId)
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
        url: `${baseUrl}/lessons`,
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
    setData({ ...data, courseSectionId: e })
    setSelectedSection(true)
  }

  return (
    <>
      <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 lg:flex-row lg:items-center lg:space-y-0">
        <h1 className="ml-3 mt-4 whitespace-nowrap text-2xl font-semibold">
          Puedes crear una clase a continuación:
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
          placeholder={"Escribe aqui el titulo de tu clase"}
          onChange={(e) => handleChange(e)}
        />
        <TextareaWithIcon
          Icon={IconFileDescription}
          label={"Descripción de la clase"}
          name={"description"}
          placeholder={"Escribe aqui la descripción de tu clase"}
          onChange={(e) => handleChange(e)}
        />
        <InputFileWithVideo
          Icon={IconDeviceImacCog}
          label={"Video de la clase"}
          name="promotional_video"
          video={video}
          setVideo={setVideo}
        />
        <InputTextWithIcon
          Icon={IconListTree}
          label={"O puedes poner una url externa"}
          name={"externalVideoUrl"}
          placeholder={"Enlace del vídeo"}
          onChange={(e) => handleChange(e)}
        />
        <InputFileWithList
          Icon={IconListTree}
          label={"Archivos la clase"}
          name={"files"}
          files={files}
          setFiles={setFiles}
        />
        <div className="my-3 flex w-full items-center justify-start rounded-full">
          <IconList className="mr-2 size-5" />
          <label htmlFor={"select"}>Selecciona una sección</label>
        </div>
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="w-full" id="select">
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {CourseSections.map((section) => (
                <SelectItem key={section.id} value={JSON.stringify(section.id)}>
                  {section.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="my-4 flex items-center space-x-2">
          <Checkbox
            id="visible"
            className="h-5 w-5"
            onCheckedChange={(e) => handleCheck(e as boolean)}
          />
          <label
            htmlFor="visible"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            ¿Es visible para los estudiantes?
          </label>
        </div>
        <MotionButton
          className="w-full"
          onClick={()=>setProgressFlag(true)}
        >
          Crear lección
        </MotionButton>

      </form>
      <UploadProgressModal
        uploadProgress={uploadProgress}
        modalOpen={progressFlag}
        close={() => close(setProgressFlag)}
        handleSubmit={handleSubmit}
        selectedSection={selectedSection}
      />
    </>
  )
}

export default NewLessonContent
