"use client"

import { FormEvent, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import { IconFolders, IconSignature } from "@tabler/icons-react"
import { Toaster, toast } from "sonner"

import useGetCategories from "@/hooks/useGetCategories"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ConfigurateAcademy } from "@/lib/requests"

export const CreateAcademyForm = () => {
  const router = useRouter()
  const params = useParams()
  const baseUrl = useUIStore((state) => state.baseUrl)
  const [loading, setLoading] = useState<boolean>(true)
  const categories = useGetCategories({
    setLoadingCallback: setLoading,
  })
  const [userData, setUserData] = useState({
    academy_category_id: "",
    name: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSelect = (e: string) => {
    const number = JSON.parse(e)
    setUserData({ ...userData, academy_category_id: number })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const [request, response] = await ConfigurateAcademy({
      academy_category_id: userData.academy_category_id,
      name: userData.name,
    })
    if (request.status === 200) {
      toast.success("Academia creada")
      router.push(
        `/admin/${response.id}/academies/${response.id}/dashboard/main`
      )
    } else {
      toast.error(response.errors)
    }
  }
  return (
    <>
      <form
        className="mt-6 flex w-full flex-col p-0"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconFolders className="mr-2 size-5" />
          <label htmlFor="email">Escoja la categoría</label>
        </div>
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="text-blue-dark mt-3 w-full text-muted-foreground dark:text-muted-foreground ">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={JSON.stringify(category.id)}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconSignature className="mr-2 size-5" />
          <label htmlFor="name">Nombre de la academia</label>
        </div>
        <Input
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          placeholder="Escribe aqui el nombre de tu academia"
          className="text-blue-dark mt-2 dark:text-white"
        />
        <Button variant={"secondary"} className="mt-10">
          Crear academia
        </Button>
      </form>
      <Toaster theme="system" position="top-right" richColors />
    </>
  )
}

export default CreateAcademyForm
