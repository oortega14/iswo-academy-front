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
import useGetCourseLearningRoute from "@/hooks/useGetCourseLearningRoute"
import SelectWithListEdit from "../forms/SelectWithListEdit"
import { Course } from "@/types/sidebar"
import CreateLearningRouteModal from "../modals/CreateLearningRouteModal"

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
  const [selectedLearningRoutes, setSelectedLearningRoutes] = useState<Course[]>([])
  const [dataLearning, setDataLearning] = useState<Course[]>([])
  const [dataCourseGoals, setDataCourseGoals] = useState<Course[]>([])
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const course = useGetCourse({
    courseId: courseId,
    setLoadingCallback: setLoading,
  })

  const courseLearningRoutes = useGetCourseLearningRoute({
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

  const close = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setModalOpenFunction(false)
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
    fd.append("course[teacher_id]", !!data.teacher_id ? data.teacher_id : "")
    fd.append("course[academy_id]", academyId)
    fd.append("course[description]", data.description)
    fd.append("course[price]", data.price)
    fd.append("course[subtitle]", data.subtitle)
    fd.append("course[title]", data.title)
    dataCourseGoals.forEach((goal, index) => {
      Object.entries(goal).forEach(([key, value]) => {
        fd.append(`course[course_goals_attributes][${index}][${key}]`, value)
      })
    })
    dataLearning.forEach((route, index) => {
      Object.entries(route).forEach(([key, value]) => {
        fd.append(`course[course_learning_routes_attributes][${index}][${key}]`, value)
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

  useEffect(() => {
    if (!!courseLearningRoutes && courseLearningRoutes.length > 0) {
      setSelectedLearningRoutes(courseLearningRoutes)
    }
  }, [courseLearningRoutes])

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
          placeholder="Escribe aqui el objetivo de tu curso"
          buttonLabel="Agregar Objetivo"
          setFinalData={setDataCourseGoals}
        />

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
          description={'Te recomendamos una relación de aspecto 16:9 y maximo 3840px por 2160px'}
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
          description={'Te recomendamos una relación de aspecto 16:9 y maximo 3840px por 2160px'}
        />
        <SelectWithListEdit
          Icon={IconList}
          info={learningRoutes}
          data={selectedLearningRoutes}
          setData={setSelectedLearningRoutes}
          label={"Escoje una o más ruta de aprendizaje"}
          placeholder={"Selecciona una ruta de aprendizaje"}
          buttonLabel={"Crear una nueva ruta"}
          setFinalData={setDataLearning}
          modalSetter={setCreateModalOpen}
        />
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
export default EditCourseContent
