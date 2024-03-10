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
import { toast } from "sonner"

import useGetCourse from "@/hooks/useGetCourse"
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

import InputFileWithImage from "../forms/InputFileWithImage"
import InputFileWithVideo from "../forms/InputFileWithVideo"
import InputNumberWithIcon from "../forms/InputNumberWithIcon"
import InputTextWithIcon from "../forms/InputTextWithIcon"
import ListItemsFromInputEdit from "../forms/ListItemsFromInputEdit"
import TextareaWithIcon from "../forms/TextareaWithIcon"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const EditCourseContent = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const { userId, academyId, courseId } = useParams<{
    userId: string
    academyId: string
    courseId: string
  }>()
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [previewImage, setPreviewImage] = useState("")
  const [banner, setBanner] = useState({})
  const [previewPromImage, setPreviewPromImage] = useState("")
  const [promotionalImage, setPromotionalImage] = useState({})
  const [video, setVideo] = useState({ name: "" })
  const [uploadProgress, setUploadProgress] = useState(0)
  const [changeFlag, setChangeFlag] = useState(false)
  const course = useGetCourse({
    courseId: courseId,
    setLoadingCallback: setLoading,
  })

  const [data, setData] = useState({
    title: "",
    subtitle: "",
    price: "",
    description: "",
    academy_id: academyId,
    course_id: courseId,
    teacher_id: null,
    banner: "",
    promotional_video: "",
    promotional_image: "",
  })

  const [dataGoals, setDataGoals] = useState([{ description: "" }])

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault()
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const learningRoutes = useGetLearningRoutes({
    academyId: academyId,
    setLoadingCallback: setLoading,
    changeFlag: changeFlag,
  })

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
    fd.append("course[teacher_id]", !!data.teacher_id ? data.teacher_id : "")
    fd.append("course[academy_id]", academyId)
    fd.append("course[description]", data.description)
    fd.append("course[price]", data.price)
    fd.append("course[subtitle]", data.subtitle)
    fd.append("course[title]", data.title)
    dataGoals.forEach((goal, index) => {
      Object.entries(goal).forEach(([key, value]) => {
        fd.append(`course[course_goals_attributes][${index}][${key}]`, value)
      })
    })

    try {
      const response = await axios({
        url: `${baseUrl}/courses/${courseId}`,
        method: "PATCH",
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
      }
    } catch (e) {}
  }

  const handleSelect = (e: any) => {
  }

  useEffect(() => {
    if (!!course && dataGoals.length === 0) {
      setData((prevConfig) => ({
        ...prevConfig,
        title: course?.title,
        subtitle: course?.subtitle,
        price: course?.price,
        description: course?.description,
        academy_id: academyId,
        course_id: courseId,
        teacher_id: course?.teacher_id,
        banner: course?.banner,
        promotional_video: course?.promotional_video,
        promotional_image: course?.promotional_image,
        learning_route_id: course?.learning_route_id,
      }))
      setDataGoals((prevConfig) => [...prevConfig, ...course?.course_goals])
    }
  }, [course])

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
          onChange={(e) => handleChange(e)}
          defaultValue={course?.title}
        />
        <InputTextWithIcon
          Icon={IconListTree}
          label={"Subtitulo del curso"}
          name={"subtitle"}
          onChange={(e) => handleChange(e)}
          defaultValue={course?.subtitle}
        />
        <InputNumberWithIcon
          Icon={IconReceipt2}
          label={"Precio del curso"}
          name={"price"}
          onChange={(e) => handleChange(e)}
          defaultValue={course?.price}
        />
        <TextareaWithIcon
          Icon={IconFileDescription}
          label={"Descripción del curso"}
          name={"description"}
          onChange={(e) => handleChange(e)}
          defaultValue={!!course?.description ? course.description : ""}
        />
        <ListItemsFromInputEdit
          data={dataGoals}
          setData={setDataGoals}
          Icon={IconList}
          label="Objetivos del Curso"
          placeholder="Escribe aqui el precio de tu curso"
          buttonLabel="Agregar Objetivo"
        />

        {/* previewImage y setPreviewImage es un estado inicializado como un string vacio para guardar las miniaturas de la imagenes que se suban y setImage es el setter de la imagen que se va a subir a la plataforma */}

        <InputFileWithImage
          Icon={IconPhotoScan}
          label={"Banner del Curso"}
          name={"banner"}
          defaultImage={!!course?.banner ? course.banner : ""}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          setImage={setBanner}
        />
        <InputFileWithImage
          Icon={IconLayoutCollage}
          label={"Imagen promocional del curso"}
          name={"promotional_image"}
          defaultImage={
            !!course?.promotional_image ? course.promotional_image : ""
          }
          previewImage={previewPromImage}
          setPreviewImage={setPreviewPromImage}
          setImage={setPromotionalImage}
        />
        <InputFileWithVideo
          Icon={IconDeviceImacCog}
          name="promotional_video"
          label={"Video Promocional del Curso"}
          defaultVideo={
            !!course?.promotional_video ? course.promotional_video : ""
          }
          video={video}
          setVideo={setVideo}
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconList className="mr-2 size-5" />
          <label htmlFor="password_confirmation">
            Escoje la ruta de aprendizaje
          </label>
        </div>
        <Select
          onValueChange={(e) => handleSelect(e)}
          value={JSON.stringify(course?.learning_route_id)}
        >
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
        <Dialog>
          <DialogTrigger className="dark:text-blue-dark bg-blue-dark my-4 w-full rounded-md p-2 font-bold text-slate-200 dark:bg-white">
            Editar curso
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
export default EditCourseContent
