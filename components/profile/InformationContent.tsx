"use client"

import { FormEvent, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
  IconList,
  IconWorldWww,
} from "@tabler/icons-react"
import { Toaster, toast } from "sonner"

import { UpdateInfoUser } from "@/lib/requests"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Separator } from "../ui/separator"

export const InformationContent = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const params = useParams<{ userId: string; academyId: string }>()
  const [loading, setLoading] = useState(true)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading,
  })
  const [userConfiguration, setUserConfiguration] = useState({
    first_name: "",
    last_name: "",
    college_degree: "",
    description: "",
  })
  const [userSocialNetwork, setUserSocialNetwork] = useState({
    web_site: "",
    facebook_profile_url: "",
    instagram_profile_url: "",
    linked_in_profile_url: "",
    x_profile_url: "",
    youtube_profile_url: "",
    tiktok_profile_url: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserConfiguration({ ...userConfiguration, [name]: value })
  }

  const handleChangeSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserSocialNetwork({ ...userSocialNetwork, [name]: value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const [request, response] = await UpdateInfoUser({
      userConfiguration: userConfiguration,
      userSocialNetwork: userSocialNetwork,
      userId: params.userId,
    })
    if (request.status == 200) {
      toast.success(`Informacion Actualizada`)
    } else {
      toast.error(`No se pudo actualizar la info`)
    }
  }

  useEffect(() => {
    if (!!currentUser) {
      setUserConfiguration((prevConfig) => ({
        ...prevConfig,
        first_name: currentUser?.first_name ?? prevConfig.first_name,
        last_name: currentUser?.last_name ?? prevConfig.last_name,
        college_degree:
          currentUser?.college_degree ?? prevConfig.college_degree,
        description: currentUser?.description ?? prevConfig.description,
      }))
      setUserSocialNetwork((prevConfig) => ({
        ...prevConfig,
        web_site: currentUser?.social_network?.web_site ?? prevConfig.web_site,
        facebook_profile_url: currentUser?.social_network?.facebook_profile_url ?? prevConfig.facebook_profile_url,
        instagram_profile_url: currentUser?.social_network?.instagram_profile_url ?? prevConfig.instagram_profile_url,
        linked_in_profile_url: currentUser?.social_network?.linked_in_profile_url ?? prevConfig.linked_in_profile_url,
        x_profile_url: currentUser?.social_network?.x_profile_url ?? prevConfig.x_profile_url,
        youtube_profile_url: currentUser?.social_network?.youtube_profile_url ?? prevConfig.youtube_profile_url,
        tiktok_profile_url: currentUser?.social_network?.tiktok_profile_url ?? prevConfig.tiktok_profile_url,
      }));
    }
  }, [currentUser])

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
            <IconList className="mr-2 size-5" />
            <label htmlFor="first_name">Nombres</label>
          </div>
          <Input
            type="text"
            placeholder="Modifica aqui tus nombres"
            name="first_name"
            onChange={(e) => handleChange(e)}
            className="mt-2"
            defaultValue={currentUser?.first_name}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconList className="mr-2 size-5" />
            <label htmlFor="last_name">Apellidos</label>
          </div>
          <Input
            type="text"
            name="last_name"
            onChange={(e) => handleChange(e)}
            placeholder="Escribe aqui tu eslogan"
            className="mt-2"
            defaultValue={currentUser?.last_name}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconList className="mr-2 size-5" />
            <label htmlFor="college_degree">Titulo Universitario</label>
          </div>
          <Input
            type="text"
            name="college_degree"
            onChange={(e) => handleChange(e)}
            placeholder="Modifica aqui tus estudios"
            className="mt-2"
            defaultValue={currentUser?.college_degree || ""}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconList className="mr-2 size-5" />
            <label htmlFor="college_degree">Descripción</label>
          </div>
          <Input
            type="text"
            name="description"
            onChange={(e) => handleChange(e)}
            placeholder="Escribe aqui una breve descripción tuya"
            className="mt-2"
            defaultValue={currentUser?.description || ""}
          />
          <Separator className="my-6 " />
          <h2 className="text-xl">Enlaces de redes sociales</h2>
          <Separator className="mt-6 " />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconWorldWww className="mr-2 size-5" />
            <label htmlFor="web_site">Pagina Web</label>
          </div>
          <Input
            type="text"
            name="web_site"
            onChange={(e) => handleChangeSecond(e)}
            placeholder="Escribe aqui la url de tu página web"
            className="mt-2"
            defaultValue={currentUser?.social_network?.web_site || ""}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconBrandFacebook className="mr-2 size-5" />
            <label htmlFor="facebook_profile_url">Facebook</label>
          </div>
          <Input
            type="text"
            name="facebook_profile_url"
            onChange={(e) => handleChangeSecond(e)}
            placeholder="Escribe aqui la url de tu Facebook"
            className="mt-2"
            defaultValue={
              currentUser?.social_network?.facebook_profile_url || ""
            }
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconBrandInstagram className="mr-2 size-5" />
            <label htmlFor="instagram_profile_url">Instagram</label>
          </div>
          <Input
            type="text"
            name="instagram_profile_url"
            onChange={(e) => handleChangeSecond(e)}
            placeholder="Escribe aqui la url de tu Instagram"
            className="mt-2"
            defaultValue={
              currentUser?.social_network?.instagram_profile_url || ""
            }
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconBrandLinkedin className="mr-2 size-5" />
            <label htmlFor="linked_in_profile_url">LinkedIn</label>
          </div>
          <Input
            type="text"
            name="linked_in_profile_url"
            onChange={(e) => handleChangeSecond(e)}
            placeholder="Escribe aqui la url de tu LinkedIn"
            className="mt-2"
            defaultValue={
              currentUser?.social_network?.linked_in_profile_url || ""
            }
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconBrandX className="mr-2 size-5" />
            <label htmlFor="x_profile_url">X</label>
          </div>
          <Input
            type="text"
            name="x_profile_url"
            onChange={(e) => handleChangeSecond(e)}
            placeholder="Escribe aqui la url de X"
            className="mt-2"
            defaultValue={currentUser?.social_network?.x_profile_url || ""}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconBrandYoutube className="mr-2 size-5" />
            <label htmlFor="youtube_profile_url">Youtube</label>
          </div>
          <Input
            type="text"
            name="youtube_profile_url"
            onChange={(e) => handleChangeSecond(e)}
            placeholder="Escribe aqui la url de youtube"
            className="mt-2"
            defaultValue={
              currentUser?.social_network?.youtube_profile_url || ""
            }
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconBrandTiktok className="mr-2 size-5" />
            <label htmlFor="tiktok_profile_url">Tiktok</label>
          </div>
          <Input
            type="text"
            name="tiktok_profile_url"
            onChange={(e) => handleChangeSecond(e)}
            placeholder="Escribe aqui la url de tiktok"
            className="mt-2"
            defaultValue={currentUser?.social_network?.tiktok_profile_url || ""}
          />
          <Button className="mt-3">Actualizar Academia</Button>
        </form>
      </main>
      <Toaster theme="system" position="top-right" richColors />
    </div>
  )
}

export default InformationContent
