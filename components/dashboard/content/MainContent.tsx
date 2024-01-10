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

export const MainContent = () => {
  const currentUser = useUIStore((state) => state.currentUser)
  const baseUrl = useUIStore((state) => state.baseUrl)
  const params = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [previewImage, setPreviewImage] = useState("")
  const [logo, setLogo] = useState({})
  const [academyConfiguration, setAcademyConfiguration] = useState({
    domain: "",
    slogan: "",
    description: "",
  })
  const academy = useGetAcademy(params.id, setLoading)

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
        toast.success("exitoso")
      } else {
        toast.error(response.message)
      }
    } catch (e) {}
  }

  useEffect(() => {
    if (!!academy) {
      setAcademyConfiguration({
        ...academyConfiguration,
        domain: academy?.academy_configuration?.domain,
        slogan: academy?.slogan,
        description: academy?.description,
      })
    }
  }, [academy])

  return (
    <div>
      <main className="flex-1 h-auto p-5 overflow-hidden ">
        <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
          <h1 className="text-2xl font-semibold whitespace-nowrap">
            Hola {currentUser?.first_name} Configuremos tu academia
          </h1>
        </div>
        <form
          className="flex flex-col p-0 w-full"
          onSubmit={(e) => handleSubmit(e)}
        >
          {!!academy?.logo && !previewImage ? (
            <>
              <div className="flex items-center mt-3">
                <IconBadgeTm className="size-5 mr-2" />
                <Label htmlFor="logo" className="text-md">
                  Logo
                </Label>
              </div>
              <div className="flex justify-start items-center w-full ">
                <Figure image={academy?.logo}/>
                <div className="grid w-full items-center gap-1.5 mt-3">
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
                  <div className="flex items-center mt-3">
                    <IconBadgeTm className="size-5 mr-2" />
                    <Label htmlFor="logo" className="text-md">
                      Logo
                    </Label>
                  </div>
                  <div className="flex justify-start items-center w-full ">
                    <Image
                      className="max-w-60 mt-3 mr-3 rounded-lg"
                      src={previewImage}
                      alt="logo_preview"
                      width={300}
                      height={300}
                    />
                    <div className="grid w-full items-center gap-1.5 mt-3">
                      <Input
                        id="logo"
                        type="file"
                        onChange={(e) => handleFile(e)}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="grid w-full items-center gap-1.5 mt-3">
                  <div className="flex items-center">
                    <IconBadgeTm className="size-5 mr-2" />
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
          <div className="rounded-full flex items-center justify-start w-full mt-3">
            <IconZoomInArea className="size-5 mr-2" />
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
          <div className="rounded-full flex items-center justify-start w-full mt-3">
            <IconBrandCodepen className="size-5 mr-2" />
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
          <div className="rounded-full flex items-center justify-start w-full mt-3">
            <IconColorPicker className="size-5 mr-2" />
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
