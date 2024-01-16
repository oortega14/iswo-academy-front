"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  IconDeviceImacCog,
  IconList,
} from "@tabler/icons-react"
import useGetCourses from "@/hooks/useGetCourses"
import { Button, buttonVariants } from "../ui/button"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"

const NewCoursesContent = () => {
  const { academyId } = useParams<{ academyId: string }>()
  const router = useRouter()
  const params = useParams()
  const [banner, setBanner] = useState({})
  const [previewImage, setPreviewImage] = useState("")

  const [data, setData] = useState({
    title: '',
    subtitle: '',
    price: '',
    description: '',
    academy_id: academyId,
    teacher_id: '',
    banner: null,
  });

  const handleSubmit = (e) => {}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (file) {
      setBanner(file)
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

  console.log(data)

  const handleSelect = (e) => {}

  return (
    <>
      <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 lg:flex-row lg:items-center lg:space-y-0">
        <h1 className="ml-3 mt-4 whitespace-nowrap text-2xl font-semibold">
          Los cursos disponibles en tu academia son
        </h1>
      </div>
      <form
        className="flex w-full flex-col px-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconList className="mr-2 size-5" />
          <label htmlFor="title">Titulo del curso</label>
        </div>
        <Input
          type="text"
          placeholder="Escribe aqui el titulo de tu curso"
          name="title"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconList className="mr-2 size-5" />
          <label htmlFor="price">Precio del curso</label>
        </div>
        <Input
          type="text"
          name="price"
          onChange={(e) => handleChange(e)}
          placeholder="Escribe aqui el precio de tu curso"
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconList className="mr-2 size-5" />
          <label htmlFor="description">Descripción del curso</label>
        </div>
        <Textarea
          name="description"
          onChange={(e) => handleChange(e)}
          placeholder="Escribe aqui la descripción de tu curso"
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconDeviceImacCog className="mr-2 size-5" />
          <label htmlFor="banner">Banner del curso</label>
        </div>
        <Input type="file" onChange={(e) => handleFile(e)} className="mt-2" />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconList className="mr-2 size-5" />
          <label htmlFor="password_confirmation">Escoje el instructor</label>
        </div>
        <Select onValueChange={(e) => handleSelect(e)}>
          <SelectTrigger className="mt-2 w-full">
            <SelectValue placeholder="Escoge al instructor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Estudiante</SelectItem>
            <SelectItem value="teacher">Profesor</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
          </SelectContent>
        </Select>

        <Button className="mb-4 mt-3">Crear Curso</Button>
      </form>
    </>
  )
}
export default NewCoursesContent
