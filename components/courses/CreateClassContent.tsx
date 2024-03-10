"use client"

import {
  IconArticle
} from "@tabler/icons-react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import MotionButton from "../animations/MotionButton"

const CreateClassContent = () => {

  const handleSubmit = (e: any) => {
  }

  const handleChange = (e: any) => {
  }

  return (
    <>
      <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 lg:flex-row lg:items-center lg:space-y-0">
        <h1 className="ml-3 mt-4 whitespace-nowrap text-2xl font-semibold">
          Crea una nueva clase
        </h1>
      </div>
      <form
        className="flex w-full flex-col p-0 px-3"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconArticle className="mr-2 size-5" />
          <label htmlFor="title">Ingresa el titulo de la clase</label>
        </div>
        <Input
          type="text"
          placeholder="Escribe aqui el titulo de la clase"
          name="title"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconArticle className="mr-2 size-5" />
          <label htmlFor="description">
            Agrega una descripción de tu clase
          </label>
        </div>
        <Textarea
          name="description"
          onChange={(e) => handleChange(e)}
          placeholder="Escribe aqui tu eslogan"
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconArticle className="mr-2 size-5" />
          <label htmlFor="description">Carga el video de la clase</label>
        </div>
        <Input
          type="file"
          name="description"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconArticle className="mr-2 size-5" />
          <label htmlFor="description">Agrega los archivos que consideres necesarios</label>
        </div>
        <Input
          type="file"
          name="description"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <MotionButton className="mt-3">Crear clase
        </MotionButton>
      </form>
    </>
  )
}
export default CreateClassContent
