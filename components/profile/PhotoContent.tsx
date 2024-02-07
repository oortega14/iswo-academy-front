"use client"

import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import { Toaster, toast } from "sonner"
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
  const params = useParams<{ userId: string; academyId: string }>()
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(true)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading,
  })
  const [previewImage, setPreviewImage] = useState("")

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
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


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const fd = new FormData();
      fd.append('section', 'profile_picture');
      if (file instanceof Blob) {
        fd.append('user[profile_picture]', file);
      }
      try {
        const request = await fetch(`${baseUrl}/users/${params.userId}`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: fd,
        });
        const response = await request.json()
        if (response.status === 200) {
          toast.success(`Datos Actualizados`);
        }
        return response;
      } catch (e) {
        console.log(e)
      }
  }

  return (
    <div>
      <main className="h-auto flex-1 overflow-hidden p-5 ">
        <div className="flex flex-col items-start justify-between space-y-4 border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
          <h1 className="whitespace-nowrap text-2xl font-semibold">
            Actualicemos la foto de tu perfil
          </h1>
        </div>
        <div className="flex w-full justify-center">
          <Card className="mt-5 flex w-[350px] flex-col items-center">
            <CardHeader>
              <CardTitle>Foto de perfil</CardTitle>
              <CardDescription>Sube una foto tuya</CardDescription>
            </CardHeader>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  {!!currentUser?.profile_picture && !previewImage ? (
                    <>
                      <div className="mt-3 flex items-center justify-center">
                        <Figure image={currentUser.profile_picture} />
                      </div>
                    </>
                  ) : (
                    <>
                      {!!previewImage ? (
                        <>
                          <div className="flex w-full items-center justify-center ">
                            <Image
                              className="mr-3 mt-3 max-w-60 rounded-lg"
                              src={previewImage}
                              alt="logo_preview"
                              width={300}
                              height={300}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="flex w-full justify-center">
                          <Image
                            className="overflow-hidden rounded-lg border-2"
                            src={"/images/avatar_singenero.webp"}
                            alt="avatar"
                            width={150}
                            height={150}
                          />
                        </div>
                      )}
                    </>
                  )}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="photo">Foto</Label>
                    <Input type="file" id="photo" onChange={(e) => handleFile(e)}/>
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
