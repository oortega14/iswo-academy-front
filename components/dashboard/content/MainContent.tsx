"use client"

import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import {
  IconBadgeTm,
  IconBrandCodepen,
  IconColorPicker,
  IconSignature,
  IconZoomInArea,
} from "@tabler/icons-react"
import { toast } from "sonner"

import { useGetAcademy } from "@/hooks/useGetAcademy"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputFileWithImage from "@/components/forms/InputFileWithImage"
import InputTextWithIcon from "@/components/forms/InputTextWithIcon"

import Figure from "./Figure"
import { MotionDiv } from "@/components/animations/MotionDiv"

export const MainContent = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const params = useParams<{ userId: string; academyId: string }>()
  const [loading, setLoading] = useState(true)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading,
  })
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
    academyId: params.academyId,
    setLoadingCallback: setLoading,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const request = await fetch(`${baseUrl}/academies/${params.userId}`, {
        method: "PATCH",
        credentials: "include",
        body: fd,
      })
      const response = await request.json()
      if (request.status === 200) {
        toast.success("Academia actualizada con exito")
      } else {
        toast.error(response.message)
      }
    } catch (e) {}
  }

  useEffect(() => {
    if (!!academy) {
      setAcademyConfiguration((prevConfig) => ({
        ...prevConfig,
        domain: academy?.academy_configuration?.domain,
        slogan: academy?.slogan,
        description: academy?.description,
      }))
    }
  }, [academy])

  return (
    <div>
      <main className="h-auto flex-1 overflow-hidden p-5 ">
        <div className="flex flex-col items-start justify-between space-y-4 border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
          <h1 className="whitespace-nowrap text-2xl font-semibold">
            Hola {currentUser?.first_name} Configuremos tu academia
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
            defaultImage={!!academy?.logo ? academy?.logo : ''}
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
          <InputTextWithIcon
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
          <Button className="mt-3 w-full">Actualizar Academia</Button>
          </MotionDiv>
        </form>
      </main>
    </div>
  )
}

export default MainContent
