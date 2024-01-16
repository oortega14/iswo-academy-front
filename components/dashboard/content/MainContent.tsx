"use client"

import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import {
  IconBadgeTm,
  IconBrandCodepen,
  IconColorPicker,
  IconZoomInArea,
} from "@tabler/icons-react"
import { toast } from "sonner"

import { useGetAcademy } from "@/hooks/useGetAcademy"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import  Figure  from "./Figure"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"

export const MainContent = () => {
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
            Hola {currentUser?.first_name} Configuremos tu academia
          </h1>
        </div>
        <form
          className="flex w-full flex-col p-0"
          onSubmit={(e) => handleSubmit(e)}
        >
          {!!academy?.logo && !previewImage ? (
            <>
              <div className="mt-3 flex items-center">
                <IconBadgeTm className="mr-2 size-5" />
                <Label htmlFor="logo" className="text-md">
                  Logo
                </Label>
              </div>
              <div className="flex w-full items-center justify-start ">
                <Figure image={academy?.logo}/>
                <div className="mt-3 grid w-full items-center gap-1.5">
                  <Input
                    id="logo"
                    type="file"
                    onChange={(e) => handleFile(e)}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {!!previewImage ? (
                <>
                  <div className="mt-3 flex items-center">
                    <IconBadgeTm className="mr-2 size-5" />
                    <Label htmlFor="logo" className="text-md">
                      Logo
                    </Label>
                  </div>
                  <div className="flex w-full items-center justify-start ">
                    <Image
                      className="mr-3 mt-3 max-w-60 rounded-lg"
                      src={previewImage}
                      alt="logo_preview"
                      width={300}
                      height={300}
                    />
                    <div className="mt-3 grid w-full items-center gap-1.5">
                      <Input
                        id="logo"
                        type="file"
                        onChange={(e) => handleFile(e)}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-3 grid w-full items-center gap-1.5">
                  <div className="flex items-center">
                    <IconBadgeTm className="mr-2 size-5" />
                    <Label htmlFor="logo" className="text-md">
                      Logo
                    </Label>
                  </div>
                  <Input
                    id="logo"
                    type="file"
                    onChange={(e) => handleFile(e)}
                  />
                </div>
              )}
            </>
          )}
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconZoomInArea className="mr-2 size-5" />
            <label htmlFor="domain">Dominio</label>
          </div>
          <Input
            type="text"
            placeholder="Escribe aqui tu dominio"
            name="domain"
            onChange={(e) => handleChange(e)}
            className="mt-2"
            defaultValue={academy?.academy_configuration?.domain}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconBrandCodepen className="mr-2 size-5" />
            <label htmlFor="slogan">Eslogan</label>
          </div>
          <Input
            type="text"
            name="slogan"
            onChange={(e) => handleChange(e)}
            placeholder="Escribe aqui tu eslogan"
            className="mt-2"
            defaultValue={academy?.slogan}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconColorPicker className="mr-2 size-5" />
            <label htmlFor="description">Descripción</label>
          </div>
          <Input
            type="text"
            name="description"
            onChange={(e) => handleChange(e)}
            placeholder="Escribe aqui una descripción de tu academia"
            className="mt-2"
            defaultValue={academy?.description}
          />
          <Button className="mt-3">Actualizar Academia</Button>
        </form>
      </main>
    </div>
  )
}

export default MainContent
