"use client"

import {
  IconArticle
} from "@tabler/icons-react"
import { MotionButton } from "../animations/MotionButton"
import { Button, buttonVariants } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

const CreateClassContent = () => {

  const handleSubmit = (e) => {
    console.log(e)
  }

  const handleChange = (e) => {
    console.log(e)
  }

  return (
    <>
      <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row px-3">
        <h1 className="text-2xl font-semibold whitespace-nowrap mt-4 ml-3">
          Crea una nueva clase
        </h1>
      </div>
      <form
        className="flex flex-col p-0 w-full px-3"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconArticle className="size-5 mr-2" />
          <label htmlFor="title">Ingresa el titulo de la clase</label>
        </div>
        <Input
          type="text"
          placeholder="Escribe aqui el titulo de la clase"
          name="title"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconArticle className="size-5 mr-2" />
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
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconArticle className="size-5 mr-2" />
          <label htmlFor="description">Carga el video de la clase</label>
        </div>
        <Input
          type="file"
          name="description"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconArticle className="size-5 mr-2" />
          <label htmlFor="description">Agrega los archivos que consideres necesarios</label>
        </div>
        <Input
          type="file"
          name="description"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <MotionButton whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.15 }}>
          <Button className="mt-3">Crear clase</Button>
        </MotionButton>
      </form>
    </>
  )
}
export default CreateClassContent
