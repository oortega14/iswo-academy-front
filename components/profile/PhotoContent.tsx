"use client"

import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import { toast } from "sonner"
import { useGetAcademy } from "@/hooks/useGetAcademy"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Figure from "../dashboard/content/Figure"

export const PhotoContent = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const params = useParams<{ id: string; academyId: string }>()
  const [loading, setLoading] = useState(true)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading,
  })
  const [previewImage, setPreviewImage] = useState("")
  const [logo, setLogo] = useState({})
  const [academyConfiguration, setAcademyConfiguration] = useState({
    domain: "",
    slogan: "",
    description: "",
  })
  const academy = useGetAcademy({
    academyId: params.academyId,
    setLoadingCallback: setLoading,
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
      }))
    }
  }, [academy])

  console.log(currentUser)

  return (
    <div>
      <main className="h-auto flex-1 overflow-hidden p-5 ">
        <div className="flex flex-col items-start justify-between space-y-4 border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
          <h1 className="whitespace-nowrap text-2xl font-semibold">
            Actualicemos la foto de tu perfil
          </h1>
        </div>
        <div className="flex justify-center w-full">
          <Card className="w-[350px] mt-5">
            <CardHeader>
              <CardTitle>Foto de perfil</CardTitle>
              <CardDescription>Sube una foto tuya</CardDescription>
            </CardHeader>
            <form>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  {!!currentUser?.profile_picture ? (
                    <Figure image={currentUser.profile_picture}/>
                  ) : (
                    <div className="w-full flex justify-center">
                      <Image
                        className="rounded-lg overflow-hidden border-2"
                        src={'/images/avatar_singenero.webp'}
                        alt="avatar"
                        width={150}
                        height={150}
                      />
                    </div>
                  )}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="photo">Foto</Label>
                    <Input type="file" id="photo" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button className="mt-3">Actualizar Academia</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default PhotoContent
