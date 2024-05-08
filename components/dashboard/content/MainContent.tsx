"use client"

import { FormEvent, useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import {
  IconBadgeTm,
  IconBrandCodepen,
  IconColorPicker,
  IconSignature,
  IconZoomInArea,
} from "@tabler/icons-react"
import axios from "axios"
import { toast } from "sonner"

import { useGetAcademy } from "@/hooks/useGetAcademy"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { MotionDiv } from "@/components/animations/MotionDiv"
import InputFileWithImage from "@/components/forms/InputFileWithImage"
import InputTextWithIcon from "@/components/forms/InputTextWithIcon"
import TextareaWithIcon from "@/components/forms/TextareaWithIcon"

export const MainContent = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const { userId, academyId } = useParams<{
    userId: string
    academyId: string
  }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading,
  })
  const [uploadProgress, setUploadProgress] = useState(0)
  // const currentUser = useUIStore((state) => state.currentUser)
  const [previewImage, setPreviewImage] = useState("")
  const [logo, setLogo] = useState({})
  const [academyConfiguration, setAcademyConfiguration] = useState({
    domain: "",
    slogan: "",
    description: "",
    name: "",
  })
  const academy = useGetAcademy({
    academyId: academyId,
    setLoadingCallback: setLoading,
  })

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setAcademyConfiguration({ ...academyConfiguration, [name]: value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const fd = new FormData()
    if (logo instanceof Blob) {
      fd.append("academy[logo]", logo)
    }
    fd.append("academy[name]", academyConfiguration.name)
    fd.append("academy[description]", academyConfiguration.description)
    fd.append("academy[slogan]", academyConfiguration.slogan)
    fd.append(
      "academy[academy_configuration_attributes][domain]",
      academyConfiguration.domain
    )

    try {
      const response = await axios({
        url: `${baseUrl}/academies/${userId}`,
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
        toast.success("Academia actualizada con exito")
        router.push(`/admin/${userId}/academies/${academyId}/dashboard/main`)
      } else {
        toast.error("No se pudo actualizar la academia")
      }
    } catch (e) {}
  }

  useEffect(() => {
    if (!!academy) {
      setAcademyConfiguration((prevConfig) => ({
        ...prevConfig,
        name: academy?.name,
        domain: academy?.academy_configuration?.domain,
        slogan: academy?.slogan,
        description: academy?.description,
      }))
    }
  }, [academy])

  return (
    <div>
      <main className="z-20 h-auto flex-1 overflow-hidden p-5">
        <div className="flex flex-col items-start justify-between space-y-4 border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
          <h1 className="whitespace-nowrap text-2xl font-semibold">
            Hola {currentUser?.first_name}, configuremos tu academia
          </h1>
        </div>
        <form
          className="flex w-full flex-col p-0"
          onSubmit={(e) => handleSubmit(e)}
        >
          <InputFileWithImage
            Icon={IconBadgeTm}
            label="Logo"
            name="logo"
            defaultImage={!!academy?.logo ? academy?.logo : ""}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            setImage={setLogo}
          />
          <InputTextWithIcon
            Icon={IconSignature}
            label="Nombre de la Academia"
            placeholder="Escribe aquí el nombre de tu academia"
            name="name"
            onChange={(e) => handleChange(e)}
            defaultValue={academy?.name}
          />
          <InputTextWithIcon
            Icon={IconZoomInArea}
            label="Dominio"
            name="domain"
            placeholder="Escribe aqui tu dominio"
            onChange={(e) => handleChange(e)}
            defaultValue={academy?.academy_configuration?.domain}
          />
          <InputTextWithIcon
            Icon={IconBrandCodepen}
            label="Eslogan"
            name="slogan"
            placeholder="Escribe aqui tu eslogan"
            onChange={(e) => handleChange(e)}
            defaultValue={academy?.slogan}
          />
          <TextareaWithIcon
            Icon={IconColorPicker}
            label="Descripción"
            name="description"
            placeholder="Escribe aqui tu descripción"
            defaultValue={academy?.description}
            onChange={(e) => handleChange(e)}
          />
          <MotionDiv
            whileHover={{ scale: 0.99 }}
            whileTap={{ scale: 1.01 }}
            className="w-full"
          >
            <Dialog>
              <DialogTrigger className="dark:text-blue-dark bg-blue-dark my-4 w-full rounded-md p-2 font-bold text-slate-200 dark:bg-white">
                Actualizar Academia
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  {uploadProgress === 0 ? (
                    <>
                      <DialogTitle className="text-2xl">
                        ¿Todos los datos ingresados son correctos?
                      </DialogTitle>
                      <DialogDescription className="flex justify-center">
                        <Button
                          onClick={handleSubmit}
                          className="mt-4 font-bold"
                        >
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
            {/* <Button className="mt-3 w-full">Actualizar Academia</Button>*/}
          </MotionDiv>
        </form>
      </main>
    </div>
  )
}

export default MainContent
