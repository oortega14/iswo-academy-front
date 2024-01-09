"use client"

import { FormEvent, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import { useParams } from 'next/navigation'
import {
  IconBadgeTm,
  IconBrandCodepen,
  IconColorPicker,
  IconZoomInArea,
} from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGetAcademy } from "@/hooks/useGetAcademy"
import { Academy } from "@/types/sidebar"

export const MainContent = () => {

  const [previewImage, setPreviewImage] = useState("")
  const [logo, setLogo] = useState({})
  const params = useParams<{ id: string}>()
  const [loading, setLoading] = useState(true)
  const academy = useGetAcademy(params.id, setLoading)
  const router = useRouter()
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

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
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined in the environment")
    }
    let data = { user: { ...userData } }
    try {
      const request = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const response = await request.json()
      if (request.status === 200) {
        toast.success("exitoso")
        router.push(`/academies/${response.academy.id}/dashboard/main`)
      } else {
        toast.error(response.errors)
      }
    } catch (e) {}
  }

  const currentUser = useUIStore((state) => state.currentUser)
  console.log(academy)
  return (
    <div>
      <main className="flex-1 h-auto max-h-full p-5 overflow-hidden overflow-y-scroll">
        <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
          <h1 className="text-2xl font-semibold whitespace-nowrap">
            Hola {currentUser?.first_name} Configuremos tu academia
          </h1>
        </div>
        <form
          className="flex flex-col p-0 w-full"
          onSubmit={(e) => handleSubmit(e)}
        >
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
              <Input id="logo" type="file" onChange={(e) => handleFile(e)} />
            </div>
          )}
          <Button className="mt-3">Actualizar Academia</Button>
        </form>
      </main>
    </div>
  )
}

export default MainContent
