"use client"

import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import {
  IconBadgeTm,
  IconBrandCodepen,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandYoutube,
  IconColorPicker,
  IconWebhook,
  IconZoomInArea,
} from "@tabler/icons-react"
import { toast } from "sonner"

import { useGetAcademy } from "@/hooks/useGetAcademy"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Figure from "../dashboard/content/Figure"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { Separator } from "../ui/separator"
import { IconWorldWww } from "@tabler/icons-react"
import { IconBrandX } from "@tabler/icons-react"

export const InformationContent = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const params = useParams<{ id: string, academyId: string }>()
  const [loading, setLoading] = useState(true)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading})
  const [previewImage, setPreviewImage] = useState("")
  const [logo, setLogo] = useState({})
  const [academyConfiguration, setAcademyConfiguration] = useState({
    domain: "",
    slogan: "",
    description: "",
  })
  const academy = useGetAcademy({
    academyId: params.academyId,
    setLoadingCallback: setLoading})
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (file) {
      setLogo(file)
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
    fd.append("academy[description]", academyConfiguration.description)
    fd.append("academy[slogan]", academyConfiguration.slogan)
    fd.append(
      "academy[academy_configuration_attributes][domain]",
      academyConfiguration.domain
    )

    try {
      const request = await fetch(`${baseUrl}/academies/${params.id}`, {
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
      }));
    }
  }, [academy])

  return (
    <div>
      <main className="h-auto flex-1 overflow-hidden p-5 ">
        <div className="flex flex-col items-start justify-between space-y-4 border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
          <h1 className="whitespace-nowrap text-2xl font-semibold">
            Actualicemos tu foto de perfil
          </h1>
        </div>
        <form
          className="flex w-full flex-col p-0"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconZoomInArea className="mr-2 size-5" />
            <label htmlFor="first_name">Nombres</label>
          </div>
          <Input
            type="text"
            placeholder="Modifica aqui tus nombres"
            name="first_name"
            onChange={(e) => handleChange(e)}
            className="mt-2"
            defaultValue={academy?.academy_configuration?.domain}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconBrandCodepen className="mr-2 size-5" />
            <label htmlFor="last_name">Apellidos</label>
          </div>
          <Input
            type="text"
            name="last_name"
            onChange={(e) => handleChange(e)}
            placeholder="Escribe aqui tu eslogan"
            className="mt-2"
            defaultValue={academy?.slogan}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconColorPicker className="mr-2 size-5" />
            <label htmlFor="college_degree">Titulo Universitario</label>
          </div>
          <Input
            type="text"
            name="college_degree"
            onChange={(e) => handleChange(e)}
            placeholder="Modifica aqui tus estudios"
            className="mt-2"
            defaultValue={academy?.description}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconColorPicker className="mr-2 size-5" />
            <label htmlFor="college_degree">Descripción</label>
          </div>
          <Input
            type="text"
            name="description"
            onChange={(e) => handleChange(e)}
            placeholder="Escribe aqui una breve descripción tuya"
            className="mt-2"
            defaultValue={academy?.description}
          />
          <Separator className="my-6 "/>
          <h2 className="text-xl">Enlaces de redes sociales</h2>
          <Separator className="mt-6 "/>
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconWorldWww className="mr-2 size-5" />
            <label htmlFor="web_site">Pagina Web</label>
          </div>
          <Input
            type="text"
            name="web_site"
            onChange={(e) => handleChange(e)}
            placeholder="Escribe aqui la url de tu página web"
            className="mt-2"
            defaultValue={academy?.description}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconBrandFacebook className="mr-2 size-5" />
            <label htmlFor="facebook_profile_url">Facebook</label>
          </div>
          <Input
            type="text"
            name="facebook_profile_url"
            onChange={(e) => handleChange(e)}
            placeholder="Escribe aqui la url de tu Facebook"
            className="mt-2"
            defaultValue={academy?.description}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconBrandInstagram className="mr-2 size-5" />
            <label htmlFor="instagram_profile_url">Instagram</label>
          </div>
          <Input
            type="text"
            name="instagram_profile_url"
            onChange={(e) => handleChange(e)}
            placeholder="Escribe aqui la url de tu Instagram"
            className="mt-2"
            defaultValue={academy?.description}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconBrandLinkedin className="mr-2 size-5" />
            <label htmlFor="linked_in_profile_url">LinkedIn</label>
          </div>
          <Input
            type="text"
            name="linked_in_profile_url"
            onChange={(e) => handleChange(e)}
            placeholder="Escribe aqui la url de tu LinkedIn"
            className="mt-2"
            defaultValue={academy?.description}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconBrandX className="mr-2 size-5" />
            <label htmlFor="x_profile_url">X</label>
          </div>
          <Input
            type="text"
            name="x_profile_url"
            onChange={(e) => handleChange(e)}
            placeholder="Escribe aqui la url de X"
            className="mt-2"
            defaultValue={academy?.description}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconBrandYoutube className="mr-2 size-5" />
            <label htmlFor="youtube_profile_url">Youtube</label>
          </div>
          <Input
            type="text"
            name="youtube_profile_url"
            onChange={(e) => handleChange(e)}
            placeholder="Escribe aqui la url de youtube"
            className="mt-2"
            defaultValue={academy?.description}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconBrandTiktok className="mr-2 size-5" />
            <label htmlFor="tiktok_profile_url">Tiktok</label>
          </div>
          <Input
            type="text"
            name="tiktok_profile_url"
            onChange={(e) => handleChange(e)}
            placeholder="Escribe aqui la url de tiktok"
            className="mt-2"
            defaultValue={academy?.description}
          />
          <Button className="mt-3">Actualizar Academia</Button>
        </form>
      </main>
    </div>
  )
}

export default InformationContent
